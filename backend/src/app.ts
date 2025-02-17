import express from "express";
import cors from "cors";
import { authRouter } from "./router/AuthRouter";
import { userRouter } from "./router/UserRouter";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { blogRouter } from "./router/BlogRouter";
import { tagRouter } from "./router/TagRouter";
import { commentRouter } from "./router/CommentRouter";

const app = express();

app.use(cors());

app.use(
    "/file",
    express.static(path.join(process.cwd(), "src", "public", "uploads"))
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/blog", blogRouter)
app.use("/api/tag", tagRouter)
app.use("/api/comment", commentRouter)


export { app }