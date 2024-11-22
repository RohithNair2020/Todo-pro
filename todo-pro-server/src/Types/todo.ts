export type Todo = {
    id: number;
    description: string;
    projectId: number;
    completed: boolean;
    created_at: string;
    updated_at: string;
};

export type UpsertTodoDTO = {
    projectId: number;
    description: string;
    completed: boolean;
};

export type GetTodosDTO = {
    projectId: number;
    completed: boolean;
};

export type GetUniqueTodoDTO = {
    id: number;
};
