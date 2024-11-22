import { Menu } from "primereact/menu";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../types";
import { useDeleteProject } from "../api/querries";
import { downloadProject } from "../api/requests";

type ProjectTileProps = {
    project: Project;
};

function ProjectTile(props: ProjectTileProps) {
    const { project } = props;
    const projectMenuRef = useRef<Menu>(null);

    const navigate = useNavigate();

    const deleteProjectMutation = useDeleteProject();

    const handleMenuOpen = (event: any) => {
        event.stopPropagation();
        projectMenuRef.current?.toggle(event);
    };

    const items = [
        {
            label: "Download",
            icon: "pi pi-download",
            command: () => downloadProject(String(project.id)),
        },
        {
            label: "Delete",
            icon: "pi pi-trash text-red-500",
            command: () => deleteProjectMutation.mutate(String(project.id)),
        },
    ];

    const navigateToProject = () => navigate(`/projects/${project.id}`);

    return (
        <>
            <div
                onClick={navigateToProject}
                className="flex items-start justify-between gap-4 w-1/4 p-3 min-w-fit cursor-pointer hover:border-blue-400 duration-300 border border-blue-00 rounded-md bg-blue-200"
            >
                <div className="flex gap-4">
                    <div className=" bg-gray-50 rounded-md p-6 h-fit">
                        <i className="pi pi-clipboard text-gray-500 text-2xl"></i>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1
                                key={project.id}
                                className="font-medium text-xl text-gray-700"
                            >
                                {project.title}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {new Date(project.createdAt).toDateString()}
                            </p>
                        </div>
                        <p className="text-sm text-gray-700">
                            {`Tasks : ${project.todos?.length || 0}`}
                        </p>
                    </div>
                </div>
                <div>
                    <span
                        onClick={handleMenuOpen}
                        className="pi pi-ellipsis-v text-lg"
                    ></span>
                </div>
            </div>
            <Menu model={items} popup ref={projectMenuRef}></Menu>
        </>
    );
}

export default ProjectTile;
