import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../Services/ApiResponseHandler";
import { Prisma, PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { ValidatorResponse } from "../Services/ValidatorResponseHandler";

const prisma = new PrismaClient();

const CreateTag = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ValidatorResponse(res, errors)
        return
    }
    try {
        const { tagName } = req.body;
        console.log(tagName)
        const user = (req as any).user
        const newTag = await prisma.tag.create({
            data: {
                tagName: tagName,
                userId: user.userId,
            },
        });
        ApiResponse(res, true, 201, "Tag created succesfully!", newTag)
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!")
    }
}

const GetAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await prisma.tag.findMany()
        if (!tags) {
            ApiResponse(res, false, 404, "No any tag found!",)
        }
        ApiResponse(res, true, 201, "Tags found succesfully!", tags)
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!")
    }
}

const GetUserTags = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const tags = await prisma.tag.findMany({
            where: {
                userId: user.userId as number,
            },
        });
        if (!tags) {
            ApiResponse(res, true, 201, "User have no any tags!", tags)
            return
        }
        ApiResponse(res, false, 404, "User's tags found succesfully!",)
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!")
    }
}

export { CreateTag, GetAllTags, GetUserTags }