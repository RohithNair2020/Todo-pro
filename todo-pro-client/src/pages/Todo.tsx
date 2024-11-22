import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { downloadProject, getProjectTodos, getUniqueProject } from "../api/requests";
import { Skeleton } from "primereact/skeleton";
import TodoTile from "../components/TodoTile";
import CreateTodo from "./CreateTodo";
import { useDeleteProject, useUpdateProject } from "../api/querries";
import { confirmDialog } from "primereact/confirmdialog";

function Todo() {
    const [createTodoVisible, setCreateTodoVisible] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [titleEdit, setTitleEdit] = useState(false);

    const { projectId } = useParams();
    const navigate = useNavigate();

    const { data: todos, isPending } = useQuery({
        queryKey: ["todos", projectId],
        queryFn: () => getProjectTodos(projectId!),
    });

    const { data: projectData } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getUniqueProject(Number(projectId)),
    });

    const projectMutation = useUpdateProject(projectId!);
    const projectDeleteMutation = useDeleteProject();

    const saveProjectChanges = () => {
        setTitleEdit(false);
        if (projectTitle !== projectData.title) {
            projectMutation.mutate({ ...projectData, title: projectTitle });
        }
    };

    const deleteCurrentProject = () => {
        projectDeleteMutation.mutate(projectId!);
        navigate("/projects");
    };

    const askForDeleteConfirmation = () => {
        confirmDialog({
            message: "Are you sure you want to delete this project?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            defaultFocus: "reject",
            accept: deleteCurrentProject,
        });
    };

    useEffect(() => {
        setProjectTitle(projectData?.title);
    }, [projectData]);

    return (
        <div className="min-w-[500px]">
            <div className="pt-10">
                {/* Header section */}
                <div className="flex justify-between border-b border-gray-200 pb-10">
                    <div className="flex gap-5 items-center ">
                        {titleEdit ? (
                            <input
                                value={projectTitle}
                                onChange={(e) =>
                                    setProjectTitle(e.target.value)
                                }
                                onBlur={saveProjectChanges}
                                autoFocus
                                className="text-5xl font-medium text-gray-700 p-0 border-none outline-none"
                            />
                        ) : (
                            <h3 className="text-5xl font-medium text-gray-700 p-0">
                                {projectTitle}
                            </h3>
                        )}
                        {!titleEdit && (
                            <span
                                onClick={() => setTitleEdit(true)}
                                className="pi pi-pencil font-medium text-2xl cursor-pointer"
                            ></span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Button
                            icon="pi pi-trash"
                            tooltip="Delete project"
                            tooltipOptions={{ position: "bottom" }}
                            onClick={askForDeleteConfirmation}
                            className="bg-red-600"
                        />
                        <Button
                            icon="pi pi-download"
                            tooltip="Download project summary"
                            tooltipOptions={{ position: "bottom" }}
                            onClick={() => downloadProject(projectData.id)}
                        />
                        <Button
                            label="New Task"
                            tooltip="Create new task"
                            tooltipOptions={{ position: "bottom" }}
                            onClick={() => setCreateTodoVisible(true)}
                        />
                    </div>
                </div>
            </div>
            <div className="py-10 flex gap-3 flex-col">
                {!isPending &&
                    todos?.map((td: any) => <TodoTile key={td.id} todo={td} />)}
                {isPending && <Skeleton height="10rem" />}
            </div>
            <Dialog
                visible={createTodoVisible}
                onHide={() => {}}
                closable={false}
                content={
                    <CreateTodo
                        onTodoCreated={() => setCreateTodoVisible(false)}
                        onTodoCreationCancel={() => setCreateTodoVisible(false)}
                    />
                }
                className="w-1/3"
            ></Dialog>
        </div>
    );
}

export default Todo;
