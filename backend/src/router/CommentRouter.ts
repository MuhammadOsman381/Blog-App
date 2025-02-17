import express from "express"
import { getUser } from "../middleware/GetUser";
import { AddComment, DeleteComment } from "../controller/CommentController";

const commentRouter = express.Router();

commentRouter.post("/add/:blogID", getUser, AddComment)
commentRouter.delete("/delete/:commentId",  DeleteComment)


export { commentRouter }