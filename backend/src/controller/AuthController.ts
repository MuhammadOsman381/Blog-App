import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiResponse } from "../Services/ApiResponseHandler";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
import { ValidatorResponse } from "../Services/ValidatorResponseHandler";
import { TokenGenerator } from "../Services/TokenHandler";
import { HashPassword } from "../Services/PasswordHandler";

const prisma = new PrismaClient();

const SignUp = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ValidatorResponse(res, errors)
        return
    }
    try {
        const { name, email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (user) {
            ApiResponse(res, false, 400, "User already exist!")
            return
        }
        const files: any = req?.files
        let image
        if (files.length > 0) {
            image = files[0].filename
        }
        else {
            image = ""
        }
        const hashedPassword = await HashPassword(password)

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
                image: image
            },
        });
        console.log(name, email, password, image)
        ApiResponse(res, false, 200, "User register succesfully!", newUser)
        return
    } catch (error) {
        console.log(error)
        ApiResponse(res, false, 500, "There is an issue with server!")
        return
    }
}


const SignIn = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ValidatorResponse(res, errors);
        return
    }
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            ApiResponse(res, false, 400, "Invalid email!");
            return
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            ApiResponse(res, false, 400, "Invalid password!");
            return
        }
        const token = TokenGenerator(user);
        ApiResponse(res, true, 200, "Logged in successfully!", token);
        return
    } catch (error) {
        console.error(error);
        ApiResponse(res, false, 500, "There is an issue with the server!");
        return
    }
};



export { SignUp, SignIn }