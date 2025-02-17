import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../Services/ApiResponseHandler";
import { PrismaClient } from "@prisma/client";
import { HashPassword } from "../Services/PasswordHandler";
import { DeleteFile } from "../Services/FileHandler";

const prisma = new PrismaClient();

const GetUser = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user
    ApiResponse(res, true, 200, "User found succesfully!", user)
    return
}

const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user
    const message = await DeleteFile(user.image)
    await prisma.comment.deleteMany({
        where: {
            userId: user.userId
        }
    })
    await prisma.blog.deleteMany({
        where: {
            userId: user.userId
        }
    })
    const deletedUser = await prisma.user.delete({
        where: {
            userId: user.userId
        }
    })
    ApiResponse(res, true, 200, "User deleted succesfully!", deletedUser)
    return
}

const EditUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body
    const user = (req as any).user;
    let image: string | undefined;
    const files: any = req.files;
    if (typeof files === "string") {
        image = files;
    } else if (Array.isArray(files) && files.length > 0) {
        await DeleteFile(user.image)
        image = files[0].filename;
    }
    const hashedPassword = await HashPassword(password)

    const editedUser = await prisma.user.update({
        where: {
            userId: user?.userId
        },
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            image: image,

        },
    })

    await prisma.comment.updateMany({
        where: {
            userId: editedUser.userId
        },
        data: {
            userImage: editedUser?.image as string,
            userName: editedUser.name as string,
        }
    })

    ApiResponse(res, true, 200, "User edited successfully!", editedUser);
};


export { GetUser, DeleteUser, EditUser }