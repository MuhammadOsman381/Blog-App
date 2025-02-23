import express from "express"
import { handleMulterError, uploadArray } from "../middleware/Multer";
import { CreateBlog, DeleteBlogByID, GetAllBlogs, GetBlogByID, GetUserBlogs, GetUserReaction, LikeOrDislike } from "../controller/BlogController";
import { getUser } from "../middleware/GetUser";

const blogRouter = express.Router();

blogRouter.post("/create", getUser, uploadArray, handleMulterError, CreateBlog)
blogRouter.get("/get-all-blogs", GetAllBlogs)
blogRouter.get("/get-user-blogs", getUser, GetUserBlogs)
blogRouter.get("/get-blog/:blogID", getUser, GetBlogByID)
blogRouter.delete("/delete-blog/:blogID", getUser, DeleteBlogByID)
blogRouter.post("/like-or-dislike/:blogID", getUser, LikeOrDislike)
blogRouter.get("/get-user-reaction/:blogID", getUser, GetUserReaction)

export { blogRouter }