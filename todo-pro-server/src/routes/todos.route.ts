import { Request, Response, Router } from "express";
import { handleErrorResponse, handleSuccessResponse } from "../utils";
import {
    createTodo,
    getTodos,
    getUniqueTodo,
} from "../controllers/todos.controller";

const todoRouter = Router();

// Create a todo
todoRouter.post("/", async (req: Request, res: Response) => {
    try {
        const createTodoDto = req.body;
        const todo = await createTodo(createTodoDto);
        handleSuccessResponse(res, todo);
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

// Route to get all todos matching the parameters
todoRouter.get("/", async (req: Request, res: Response) => {
    try {
        const getTodosDto = req.body;
        const todos = await getTodos(getTodosDto);
        handleSuccessResponse(res, todos);
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

// Route to get a unique todo using id
todoRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getUniqueTodoDto = {
            id: Number(id),
        };

        const todo = await getUniqueTodo(getUniqueTodoDto);
        if (!todo) {
            const error = {
                error: "Project not found",
            };
            handleErrorResponse(res, error, "Project not found", 404);
        } else {
            handleSuccessResponse(res, todo);
        }
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

export default todoRouter;
