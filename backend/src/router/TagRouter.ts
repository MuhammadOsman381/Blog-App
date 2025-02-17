import express from "express"
import { getUser } from "../middleware/GetUser";
import { CreateTag, GetAllTags, GetUserTags } from "../controller/TagController";
import { body } from "express-validator";

const tagRouter = express.Router();

tagRouter.post("/create",
    [
        body("tagName").notEmpty().withMessage("Tag name is required"),
    ], getUser, CreateTag)


tagRouter.get("/get-all-tags", GetAllTags)
tagRouter.get("/get-user-tags", getUser, GetUserTags)


export { tagRouter }