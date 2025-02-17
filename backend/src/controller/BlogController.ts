import { NextFunction, Request, RequestHandler, Response } from "express";
import { ApiResponse } from "../Services/ApiResponseHandler";
import { PrismaClient } from "@prisma/client";
import { DeleteFile } from "../Services/FileHandler";

interface MulterFile {
    originalname: string;
}

const prisma = new PrismaClient();

const CreateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, tags } = req.body;
        const files = req.files as MulterFile[] | undefined;
        const images: string[] = files && files.length > 0
            ? files.map((file: any) => file.filename)
            : [];
        const user = (req as any).user;

        console.log({
            title, description, tags, files
        })

        const newBlog = await prisma.blog.create({
            data: {
                title: title,
                description: description,
                userId: user.userId,
                images: images,
                tags: tags,
            },
        });
        ApiResponse(res, true, 201, "Blog created successfully!", newBlog);
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!");
        next(error);
    }
};


const GetAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await prisma.blog.findMany();
        if (!blogs) {
            ApiResponse(res, false, 404, "Blogs not found!");
        }
        ApiResponse(res, true, 201, "Blog found successfully!", blogs);
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!");
        next(error);
    }
};

const GetUserBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const blogs = await prisma.blog.findMany({
            where: {
                userId: user.userId
            }
        });
        if (!blogs) {
            ApiResponse(res, false, 404, "Blogs not found!");
        }
        ApiResponse(res, true, 201, "User's blog found successfully!", blogs);
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!");
        next(error);
    }
};

const GetBlogByID: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const blogID = Number(req.params.blogID);
        const user = (req as any).user
        const blog = await prisma.blog.findUnique({
            where: { blogId: blogID },
            include: {
                comments: true
            }
        });
        if (!blog) {
            ApiResponse(res, false, 404, "Blog not found!");
            return;
        }
        ApiResponse(res, true, 200, "Blog found successfully!", { blog: blog, user: user.userId });
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!");
        next(error);
    }
};


const DeleteBlogByID: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const blogID = Number(req.params.blogID);

        await prisma.comment.deleteMany({
            where: { blogId: blogID }
        });
        const blog: any = await prisma.blog.delete({
            where: { blogId: blogID }
        });

        blog?.images.map(async (image: string) => {
            await DeleteFile(image)
        })

        console.log(blog)
        if (!blog) {
            ApiResponse(res, false, 404, "Blog not found!");
            return;
        }
        ApiResponse(res, true, 200, "Blog deleted successfully!", blog);
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!");
        next(error);
    }
};


export { CreateBlog, GetAllBlogs, GetUserBlogs, GetBlogByID, DeleteBlogByID };
