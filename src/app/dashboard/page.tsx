"use client"
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProjectListItem from "@/components/custom/ProjectListItem";
import { Project } from "@/types/models";

const fetchProjects = async (userId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/projects`, {
    params: { userId },
  });
  return res.data.data; // adjust if your API response differs
};

const Dashboard = () => {
  const { data: session } = useSession();

  const { data: projects} = useQuery<Project[]>({
    queryKey: ["projects", session?.user?.id],
    queryFn: () => fetchProjects(session!.user.id),
    enabled: !!session?.user?.id,
  });


  return (
    <div className="w-full flex flex-col gap-4 p-10">
      {projects?.map((project) => (
        <ProjectListItem
          key={project.id}
          projectId={project.id}
          title={project.title}
          onEdit={() => console.log("Edit")}
          onDelete={() => console.log("Delete")}
        />
      ))}
    </div>
  );
};

export default Dashboard;
