export type Project = {
    id: number;
    userId: number;
    title: number;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
};

export type UpsertProjectDTO = {
    userId: number;
    title: string;
};

export type GetProjectsDTO = {
    userId: number;
    title?: string;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export type GetUniqueProjectDTO = {
    id: number;
};
