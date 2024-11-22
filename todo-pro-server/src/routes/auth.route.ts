import { Request, Response, Router } from "express";
import { login, register } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
    login(req, res);
});

authRouter.post("/register", async (req: Request, res: Response) => {
    register(req, res);
});
