import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { fetchProjects } from "../api/requests";
import { Dialog } from "primereact/dialog";
import CreateProject from "./CreateProject";
import { useState } from "react";
import ProjectTile from "../components/ProjectTile";
import { Skeleton } from "primereact/skeleton";
import { type Project } from "../types";

function Project() {
    const [createFormVisible, setCreateFormVisible] = useState(false);

    const { data: projects, isPending } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });

    return (
        <>
            <div className="pt-10">
                {/* Header section */}
                <div className="flex justify-between border-b border-gray-200 pb-10">
                    <h3 className="text-5xl font-medium text-gray-700 p-0">
                        Projects
                    </h3>
                    <Button
                        label="New Project"
                        onClick={() => setCreateFormVisible(true)}
                    />
                </div>

                {/* Projects listing */}
                <div className="py-10 flex gap-3 flex-wrap">
                    {!isPending &&
                        projects?.map((pro: Project) => (
                            <ProjectTile key={pro.id} project={pro} />
                        ))}
                    {isPending && <Skeleton height="10rem" />}
                </div>
            </div>
            <Dialog
                visible={createFormVisible}
                onHide={() => {}}
                closable={false}
                content={
                    <CreateProject
                        onProjectCreated={() => setCreateFormVisible(false)}
                        onProjectCreationCancel={() =>
                            setCreateFormVisible(false)
                        }
                    />
                }
                className="w-1/3"
            ></Dialog>
        </>
    );
}

export default Project;
