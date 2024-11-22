import { Request, Response, Router } from "express";
import { handleErrorResponse } from "../utils";

export const userRouter = Router();

// Create a user
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        // Create a user
    } catch (e) {
        handleErrorResponse(res, e);
    }
});

// Get a unique user
userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        // Get a unique user
    } catch (e) {
        handleErrorResponse(res, e);
    }
});

// Update a user
userRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        // Update a user
    } catch (e) {
        handleErrorResponse(res, e);
    }
});

