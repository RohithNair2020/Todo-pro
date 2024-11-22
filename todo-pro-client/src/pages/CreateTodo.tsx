import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { createProjectTodo } from "../api/requests";

type CreateTodoComponentProps = {
    onTodoCreated?: () => any;
    onTodoCreationCancel?: () => any;
};

function CreateTodo(props: CreateTodoComponentProps) {
    const { onTodoCreated, onTodoCreationCancel } = props;
    const { projectId } = useParams();

    const queryClient = useQueryClient();
    const [description, setDescription] = useState<string>("");

    const createTodoMutation = useMutation({
        mutationFn: (todoData: any) =>
            createProjectTodo(Number(projectId), todoData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos", projectId],
            });
            toast.success(`New task created`);
            if (onTodoCreated) {
                onTodoCreated();
            }
        },
    });

    const triggerTodoCreate = () => {
        if (description) {
            createTodoMutation.mutate({ description });
        }
    };

    const handleCancel = () => {
        if (onTodoCreationCancel) {
            onTodoCreationCancel();
        }
    };

    return (
        <div className="flex flex-col gap-3 bg-white p-4 border-none rounded-md">
            <h2 className="text-gray-600 text-2xl font-medium mb-3">
                Create new task
            </h2>
            <InputText
                id="username"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                autoComplete="off"
            />
            <div className="flex gap-2 justify-end mt-5">
                <Button label="Cancel" onClick={handleCancel} outlined></Button>
                <Button
                    onClick={triggerTodoCreate}
                    label="Create"
                    disabled={!description}
                ></Button>
            </div>
        </div>
    );
}

export default CreateTodo;
