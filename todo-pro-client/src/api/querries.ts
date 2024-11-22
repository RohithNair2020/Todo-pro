import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject, deleteTodo, updateProject, updateTodo } from "./requests";
import { toast } from "react-toastify";
import { Project, Todo } from "../types";

export const useUpdateProject = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectInfo: Project) => updateProject(projectInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });
            toast.success("Project updated");
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
            toast.success(`Project deleted successfully`);
        },
    });
};

export const useUpdateTodo = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todoData: Todo) => updateTodo(projectId, todoData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos", projectId],
            });
            toast.success("Task updated");
        },
    });
};

export const useDeleteTodo = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteTodo(projectId!, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos", projectId],
            });
            toast.success("Deleted task");
        },
    });
};
