import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { confirmPopup } from "primereact/confirmpopup";
import { useState } from "react";
import { Todo } from "../types";
import { useDeleteTodo, useUpdateTodo } from "../api/querries";

type TodoTileProps = {
    todo: Todo;
};

function TodoTile(props: TodoTileProps) {
    const { todo } = props;
    const { projectId } = useParams();

    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState(todo.description);

    const todoUpdateMutation = useUpdateTodo(projectId!);
    const deleteTodoMutation = useDeleteTodo(projectId!);

    const editTodo = () => {
        setEdit(true);
    };

    // Handles the status change of a task
    const handleTodoStatusChange = (e: CheckboxChangeEvent) => {
        const completed = e.checked;
        const updatedTodo: Todo = {
            ...todo,
            completed: completed!,
        };
        todoUpdateMutation.mutate(updatedTodo);
    };

    // Ask for confirmation before deleting the task
    const confirmDelete = (e: any) => {
        confirmPopup({
            target: e.currentTarget as HTMLElement,
            message: "Are you sure you want to delete this task?",
            icon: "pi pi-exclamation-triangle",
            defaultFocus: "reject",
            accept: () => deleteTodoMutation.mutate(todo.id),
        });
    };

    // Updates the description of the task
    const updateDescription = () => {
        setEdit(false);
        if (description !== todo.description) {
            todoUpdateMutation.mutate({
                ...todo,
                description,
            });
        }
    };

    return (
        <>
            <div
                className={classNames(
                    "flex items-center justify-between gap-4 p-3 w-full cursor-pointer duration-300 border rounded-md",
                    {
                        "bg-red-100": !todo?.completed,
                        "border-red-300": !todo?.completed,
                        "bg-green-100": todo?.completed,
                        "border-green-300": todo?.completed,
                    }
                )}
            >
                <div className="flex gap-4 items-center w-full">
                    <div>
                        <Checkbox
                            onChange={handleTodoStatusChange}
                            checked={todo.completed}
                        ></Checkbox>
                    </div>
                    <div className="flex flex-col flex-1">
                        {edit ? (
                            <input
                                className="bg-transparent border-none outline-none font-medium text-lg text-gray-700"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                onBlur={updateDescription}
                                value={description}
                                autoFocus
                            ></input>
                        ) : (
                            <h1
                                key={todo.id}
                                className={classNames(
                                    "font-medium text-lg text-gray-700",
                                    { "line-through": todo.completed }
                                )}
                            >
                                {description}
                            </h1>
                        )}
                    </div>
                    <div className="flex gap-5">
                        <p className="text-sm text-gray-600 tracking-wider">
                            {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                        {!edit && (
                            <>
                                <span
                                    className="pi pi-pencil"
                                    onClick={editTodo}
                                ></span>
                            </>
                        )}
                        <span
                            className="pi pi-trash text-red-600"
                            onClick={confirmDelete}
                        ></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoTile;
