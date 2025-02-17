import express from "express";
import { SignIn, SignUp } from "../controller/AuthController";
import { NextFunction, Request, Response } from "express";
import { uploadArray } from "../middleware/Multer";
import { body } from "express-validator";

const authRouter = express.Router();

authRouter.post("/sign-up", uploadArray,
  [
    body("name").isString().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email Address is required"),
    body("password").isLength({ min: 4 }).withMessage("Password is required"),
  ], SignUp)

authRouter.post("/log-in",
  [
    body("email").isEmail().withMessage("Email Address is required"),
    body("password").isLength({ min: 4 }).withMessage("Password is required"),
  ], SignIn)

export { authRouter }