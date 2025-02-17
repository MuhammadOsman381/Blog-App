import multer from "multer";
import path from "path";
import { Request, NextFunction, Response } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "src", "public", "uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const timestamp = Date.now();
    cb(null, `${timestamp}-${sanitizedName}`);
  },
});

const upload = multer({
  storage,

  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadArray = upload.array("file", 5);

export const attachStringFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((!req.files || (Array.isArray(req.files) && req.files.length === 0)) && req.body.file) {
    req.files = req.body.file;
  }
  next();
};

export const handleMulterError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
    return
  }
  if (err) {
    res.status(400).json({ error: err.message });
    return
  }
  next();
};
