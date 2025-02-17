import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../Services/ApiResponseHandler";

const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers["token"];
    if (!token) {
        ApiResponse(res, false, 401, "Access token is missing!")
        return
    }
    const decodedToken: any = jwt.verify(token as string, process.env.JWT_SECRET as string);
    const user = await prisma.user.findUnique({
        where: {
            userId: decodedToken._id,
        },
    });
    if (!user) {
        ApiResponse(res, false, 404, "User not found!")
        return
    }
    (req as any).user = user;
    next();
}

export { getUser }