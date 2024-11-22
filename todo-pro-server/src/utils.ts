import { Project, Todo } from "@prisma/client";
import { Response } from "express";

export const handleSuccessResponse = (
    res: Response,
    payload: any,
    statusCode: number = 200
) => {
    const response = {
        status: true,
        payload,
    };
    res.status(statusCode).json(response);
};

export const handleErrorResponse = (
    res: Response,
    error: any,
    message: string = "Something went wrong",
    statusCode: number = 500
) => {
    const payload = {
        status: false,
        message,
        error,
    };
    res.status(statusCode).json(payload);
};

export const projectSummaryTemplate = (project: Project & { Todo: Todo[] }) => {
    if (!project) {
        return "";
    }

    try {
        const title = project.title;
        const tasks = project.Todo;
        const pendingTasks = tasks?.filter((t) => !t.completed);
        const createdOn = new Date(project.createdAt).toDateString();

        const renderPendingTasks = () => {
            return pendingTasks
                ?.filter((t) => !t.completed)
                .map((t) => {
                    return `- [ ] ${t.description}\n`;
                })
                .join("");
        };

        const renderCompletedTasks = () => {
            return tasks
                ?.filter((t) => t.completed)
                .map((t) => {
                    return `- [x] ${t.description}\n`;
                })
                .join("");
        };

        const markdownContent = `# ${title}\n- _Created on **${createdOn}**_\n- _Summary: **${
            pendingTasks?.length
        }/${
            tasks?.length
        }** tasks completed_\n## Pending\n${renderPendingTasks()}\n## Completed\n${renderCompletedTasks()}`;

        return markdownContent;
    } catch (e) {
        console.log(e);
        return "";
    }
};
