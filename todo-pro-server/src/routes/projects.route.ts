import { Request, Response, Router } from "express";
import {
    createProject,
    createProjectTodo,
    deleteProject,
    deleteTodo,
    getProjects,
    getProjectTodos,
    getUniqueProject,
    streamProjectSummaryFile,
    updateProjectInfo,
    updateProjectTodo,
} from "../controllers/projects.controller";
import { handleErrorResponse, handleSuccessResponse } from "../utils";
import { GetProjectsDTO } from "../Types/project";

const projectRouter = Router();

// Create a project
projectRouter.post("/", async (req: Request, res: Response) => {
    try {
        const createProjectDto = req.body;
        const project = await createProject(createProjectDto);
        handleSuccessResponse(res, project);
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

// Route to get all projects matching the parameters
projectRouter.get("/", async (req: Request, res: Response) => {
    try {
        const getProjectsDto: GetProjectsDTO = {
            userId: Number((req as any).user.id),
        };

        const projects = await getProjects(getProjectsDto);
        handleSuccessResponse(res, projects);
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

// Route to get a unique project using id
projectRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getUniqueProjectDto = {
            id: Number(id),
        };

        const project = await getUniqueProject(getUniqueProjectDto);
        handleSuccessResponse(res, project);
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

projectRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const projectData = req.body;
        const projectEdit = await updateProjectInfo(Number(id), projectData);
        handleSuccessResponse(res, projectEdit);
    } catch (e) {
        handleErrorResponse(res, e);
    }
});

// Delete the project with the specified ID
projectRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const projectDelete = await deleteProject(Number(id));
        handleSuccessResponse(res, { status: true, projectDelete });
    } catch (e) {
        handleErrorResponse(res, e);
    }
});

// Create a todo
projectRouter.post("/:projectId/todos", async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const todo = await createProjectTodo(Number(projectId), req.body);
        handleSuccessResponse(res, todo);
    } catch (e) {
        handleErrorResponse(res, e);
    }
});

// Get all the todos of a project
projectRouter.get("/:projectId/todos", async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const todos = await getProjectTodos(Number(projectId));
        handleSuccessResponse(res, todos);
    } catch (e) {
        handleErrorResponse(res, e);
    }
});

// Update a specific todo under a specific project
projectRouter.patch(
    "/:projectId/todos/:todoId",
    async (req: Request, res: Response) => {
        try {
            const { projectId, todoId } = req.params;
            const updateTodo = await updateProjectTodo(
                Number(projectId),
                Number(todoId),
                req.body
            );
            handleSuccessResponse(res, updateTodo);
        } catch (e) {
            handleErrorResponse(res, e);
        }
    }
);

// Delete a todo
projectRouter.delete(
    "/:projectId/todos/:todoId",
    async (req: Request, res: Response) => {
        try {
            const { projectId, todoId } = req.params;
            const deleteResponse = await deleteTodo(
                Number(projectId),
                Number(todoId)
            );
            handleSuccessResponse(res, deleteResponse);
        } catch (e) {
            handleErrorResponse(res, e);
        }
    }
);

// Download a todo as a markdown file
projectRouter.get(
    "/:projectId/download",
    async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            streamProjectSummaryFile(res, projectId);
        } catch (e) {
            handleErrorResponse(res, e);
        }
    }
);

export default projectRouter;
