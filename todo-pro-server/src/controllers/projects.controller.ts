import { Prisma, Project } from "@prisma/client";
import { prisma } from "../prismaClient";
import {
    GetProjectsDTO,
    GetUniqueProjectDTO,
    UpsertProjectDTO,
} from "../Types/project";
import { Response } from "express";
import fs from "fs";
import path from "path";
import { projectSummaryTemplate } from "../utils";

// Create a project
export const createProject = async (createProjectDto: UpsertProjectDTO) => {
    const projectInfo: Prisma.ProjectCreateInput = {
        user: {
            connect: {
                id: createProjectDto.userId,
            },
        },
        title: createProjectDto.title,
        description: "",
    };
    const project = await prisma.project.create({ data: projectInfo });
    return project;
};

// Get all the projects
export const getProjects = async (getProjectsDto: GetProjectsDTO) => {
    let projectsQuery: Prisma.ProjectWhereInput = getProjectsDto;

    const projects = await prisma.project.findMany({
        where: projectsQuery,
        include: {
            todos: true
        }
    });

    return projects;
};

// Get a single unique project
export const getUniqueProject = async (
    getUniqueProjectDto: GetUniqueProjectDTO
) => {
    const { id } = getUniqueProjectDto;

    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) throw "Project not found";

    return project;
};

// Update a project
export const updateProjectInfo = async (
    projectId: number,
    projectInfo: Project
) => {
    const projectEdit = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: projectInfo,
    });
    return projectEdit;
};

// Deletes a project
export const deleteProject = async (id: number) => {
    const projectDelete = await prisma.project.delete({ where: { id } });
    return projectDelete;
};

// Creates a todo under a project
export const createProjectTodo = async (
    projectId: number,
    createTodoDto: { description: string }
) => {
    const data: Prisma.TodoCreateInput = {
        description: createTodoDto.description,
        completed: false,
        project: {
            connect: {
                id: projectId,
            },
        },
    };

    const todo = await prisma.todo.create({ data });
    return todo;
};

// Gets all the todos of a project
export const getProjectTodos = async (id: number) => {
    const todos = await prisma.todo.findMany({
        where: { projectId: id },
        orderBy: { createdAt: "asc" },
    });
    return todos;
};

// Updates a todo
export const updateProjectTodo = async (
    projectId: number,
    todoId: number,
    data: Prisma.TodoUpdateInput
) => {
    const updateResponse = await prisma.todo.update({
        where: {
            projectId,
            id: todoId,
        },
        data,
    });
    return updateResponse;
};

// Delete a todo in a project
export const deleteTodo = async (projectId: number, todoId: number) => {
    const deleteTodo = await prisma.todo.delete({
        where: {
            id: todoId,
            projectId,
        },
    });
    return deleteTodo;
};

export const streamProjectSummaryFile = async (
    res: Response,
    projectId: string
) => {
    const project = await prisma.project.findUnique({
        where: { id: Number(projectId) },
        include: {
            todos: true,
        },
    });

    if (project) {
        const markdownContent = projectSummaryTemplate(project as any);
        const fileName = `project-${project.id}0-summary.md`;
        const filePath = path.join(__dirname, fileName);

        fs.writeFile(filePath, markdownContent, (err) => {
            if (err) {
                console.log("Error writing file", err);
                res.status(500).send("Could not download file");
            } else {
                res.download(filePath, fileName, (err) => {
                    if (err) {
                        console.error("Error sending file:", err);
                        res.status(500).send("Could not download file.");
                    }

                    // Clean up the file after sending
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr)
                            console.error("Error deleting file:", unlinkErr);
                    });
                });
            }
        });
    } else throw "Project not found";
};
