export type Project = {
    id: number,
    title: string,
    description?: string,
    createdAt: string,
    updatedAt: string
    todos?: Todo[]
}

export type Todo = {
    id: number,
    description: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string
}