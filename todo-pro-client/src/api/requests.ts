import { toast } from "react-toastify";
import { apiClient } from "../apiClient";

// Fetch all the projects
export const fetchProjects = async () => {
    const response = await apiClient.get(`/project`);
    return response.data?.payload;
};

// Fetch a unique project
export const getUniqueProject = async (projectId: number) => {
    const response = await apiClient.get(`/project/${projectId}`);
    return response.data.payload;
};

// Create a project
export const createProject = async (project: any) => {
    const response = await apiClient.post(`/project`, {
        title: project.title,
    });
    return response;
};

// Updates a project
export const updateProject = async (project: any) => {
    const response = await apiClient.patch(`/project/${project.id}`, project);
    return response;
};

// Delete a project
export const deleteProject = async (projectId: string) => {
    await apiClient.delete(`/project/${projectId}`);
};

// Fetch all the todos under a project
export const getProjectTodos = async (projectId: string) => {
    const projectTodos = await apiClient.get(`/project/${projectId}/todos`);
    return projectTodos.data?.payload;
};

// Create a todo under a project
export const createProjectTodo = async (projectId: number, todoData: any) => {
    const projectTodo = await apiClient.post(
        `/project/${projectId}/todos`,
        todoData
    );
    return projectTodo.data?.payload;
};

// Update a todo
export const updateTodo = async (projectId: string, todoData: any) => {
    const projectTodo = await apiClient.patch(
        `/project/${projectId}/todos/${todoData.id}`,
        todoData
    );
    return projectTodo.data?.payload;
};

// Delete a todo
export const deleteTodo = async (projectId: string, todoId: number) => {
    const deleteTodo = await apiClient.delete(
        `/project/${projectId}/todos/${todoId}`
    );
    return deleteTodo;
};

// Download the summary of a project
export const downloadProject = async (projectId: string, projectTitle: string) => {
    try {
        if(!projectId) throw "Invalid projectId for download";

        const response = await apiClient.get(
            `/project/${projectId}/download`
        );

        const content = response.data;
        const blob = new Blob([content], { type: "text/markdown" });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const fileName = `${projectTitle}.md`;

        a.href = url;
        a.download = fileName; 

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        console.warn(e);
        toast.error("Download failed");
    }
};
