import express from "express";
import projectRouter from "./routes/projects.route";
import cors from "cors";
import { config } from "dotenv";
import todoRouter from "./routes/todos.route";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/authentication";

config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/project", authenticate, projectRouter);
app.use("/todo", authenticate, todoRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Todo Pro server live at :: ", PORT);
});
