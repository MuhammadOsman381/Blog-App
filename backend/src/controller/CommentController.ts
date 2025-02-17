import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../Services/ApiResponseHandler";
import { Prisma, PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { ValidatorResponse } from "../Services/ValidatorResponseHandler";

const prisma = new PrismaClient();

const AddComment = async (req: Request, res: Response) => {
    try {
        const { comment } = req.body;
        const user = (req as any).user
        const blogID = Number(req.params.blogID);
        const newComment = await prisma.comment.create({
            data: {
                blogId: blogID,
                userId: user.userId,
                comment: comment,
                userName: user.name,
                userImage: user.image
            }
        })
        ApiResponse(res, true, 201, "Comment added succesfully!", newComment)
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!")
    }
}

const DeleteComment = async (req: Request, res: Response) => {
    try {
        const commentID = Number(req.params.commentId);
        const deletedComment = await prisma.comment.delete({
            where: {
                commentId: commentID
            }
        })
        ApiResponse(res, true, 201, "Comment deleted succesfully!", deletedComment)
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!")
    }
}

export { AddComment, DeleteComment }