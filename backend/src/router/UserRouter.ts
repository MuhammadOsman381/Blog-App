import express from "express"
import { DeleteUser, EditUser, GetUser } from "../controller/UserController";
import { getUser } from "../middleware/GetUser";
import { attachStringFile, handleMulterError, uploadArray } from "../middleware/Multer";

const userRouter = express.Router();

userRouter.get("/get", getUser, GetUser)
userRouter.delete("/delete", getUser, DeleteUser)
userRouter.put("/edit", getUser,
    uploadArray,
    attachStringFile, EditUser)

export { userRouter }