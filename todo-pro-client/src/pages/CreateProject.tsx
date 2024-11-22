import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { createProject } from "../api/requests";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

type CreateProjectComponentProps = {
    onProjectCreated?: () => any;
    onProjectCreationCancel?: () => any;
};

function CreateProject(props: CreateProjectComponentProps) {
    const { onProjectCreated, onProjectCreationCancel } = props;

    const queryClient = useQueryClient();
    const [title, setTitle] = useState<string>("");

    const createProjectMutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
            toast.success(`New project created`);
            if (onProjectCreated) {
                onProjectCreated();
            }
        },
    });

    const handleCancel = () => {
        if (onProjectCreationCancel) {
            onProjectCreationCancel();
        }
    };

    return (
        <div className="flex flex-col gap-3 bg-white p-4 border-none rounded-md">
            <h2 className="text-gray-600 text-2xl font-medium mb-3">
                Create new project
            </h2>
            <InputText
                id="username"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                autoComplete="off"
            />
            <div className="flex gap-2 justify-end mt-6">
                <Button label="Cancel" onClick={handleCancel} outlined></Button>
                <Button
                    onClick={() => createProjectMutation.mutate({ title })}
                    label="Create"
                    disabled={!title}
                ></Button>
            </div>
        </div>
    );
}

export default CreateProject;
