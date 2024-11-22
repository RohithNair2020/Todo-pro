import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Auth token not found" });
            return;
        }

        const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
        const user = await prisma.user.findUnique({
            where: {
                id: Number((decoded as any).id),
            },
        });
        if (!user) {
            res.status(401).json({ message: "Invalid user" });
            return;
        }
        (req as any).user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Failed to authenticate token" });
    }
};
