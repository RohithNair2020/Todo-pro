import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { GetTodosDTO, GetUniqueTodoDTO, UpsertTodoDTO } from "../Types/todo";

// Create a project
export const createTodo = async (createTodoDto: UpsertTodoDTO) => {
    const todoInfo: Prisma.TodoCreateInput = {
        project: {
            connect: {
                id: createTodoDto.projectId
            }
        },
        description: createTodoDto.description,
        completed: false
    };
    const project = await prisma.todo.create({ data: todoInfo });
    return project;
};

// Get all the projects
export const getTodos = async (getProjectsDto: GetTodosDTO) => {
    console.log(getProjectsDto);
    return [];
};

// Get a single unique project
export const getUniqueTodo = async (
    getUniqueProjectDto: GetUniqueTodoDTO
) => {
    console.log(getUniqueProjectDto);
    return {};
};
