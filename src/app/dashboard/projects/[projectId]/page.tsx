"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import * as React from "react";
import { useSession } from "next-auth/react";
import { useNavigation } from "@/store/NavigationContext";
import BoardItem from "@/components/custom/BoardItem";
import { Board } from "@/types/models";
import ProjectHeader from "@/components/custom/ProjectHeader"; // <— imported here
import { Project } from "@/types/models";
import BoardManager from "@/components/custom/BoardManager";
const ProjectPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = React.use(params);
  const { data: session } = useSession();
  const { navigate } = useNavigation();

  const fetchProjectById = async () => {
    console.log(projectId)

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/projects/projectDetails`, {
        params: { projectId:projectId, userId: session?.user.id },
      });
      if (res.data.success) return res.data.data;
      return null;
    } catch {
      navigate("/dashboard");
      return null;
    }
  };

  const { data: project, isLoading, error, refetch } = useQuery({
    queryKey: ["project", projectId],
    queryFn: fetchProjectById,
    enabled: !!projectId && !!session?.user.id,
  });

const queryClient = useQueryClient();
  if (isLoading) return <div className="p-10 text-lg">Loading project...</div>;
  if (error || !project) return <div>Project not found or unauthorized</div>;

  // handlers for project title edit/delete
  const handleEditProjectTitle = async (newTitle: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/projects/projectDetails`, {
        id:projectId,
        title: newTitle,
      });
      refetch();
    } catch {
      navigate("/dashboard")
    }
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/projects/projectDetails`, {
       data: { id: projectId },
      });
      refetch()
      navigate("/dashboard");
    } catch {
     navigate("/dashboard")
    }
  };
  // handlers for boards/todos
  const handleEditBoard = (boardId: string) => console.log("Edit board", boardId);
  const handleDeleteBoard = (boardId: string) => console.log("Delete board", boardId);
  const handleEditTodo = (todoId: string) => console.log("Edit todo", todoId);
  const handleDeleteTodo = (todoId: string) => console.log("Delete todo", todoId);
  const handleToggleCompleteTodo = (todoId: string) => console.log("Toggle complete", todoId);

  return (
    <div className="w-full flex flex-col">
      {/* Integrated Header */}
      <div className="pt-5 pl-10 pr-10 mb-4">
        <ProjectHeader
          title={project.title}
          onEdit={handleEditProjectTitle}
          onDelete={handleDeleteProject}
        />
      </div>

      {/* Boards */}
      <div className=" mt-2 flex overflow-x-auto gap-4 relative">
     
        {project.boards.map((board: Board, index: number) => (
          <BoardManager
          boardIndex={index}
          boardsList={project.boards}
          todosList={board.todos}
          boardId={board.id}
          boardTitle={board.title}
          key={index}
          />
          // <BoardItem
          // key={board.id}
          // boardId={board.id}
          // title={board.title}
          // // position={index + 1}
          // boardIndex={index+1}
          // todos={board.todos}
          //   boards={project.boards}
          //   onEditBoard={() => handleEditBoard(board.id)}
          //   onDeleteBoard={() => handleDeleteBoard(board.id)}
          //   onEditTodo={handleEditTodo}
          //   onDeleteTodo={handleDeleteTodo}
          //   onToggleCompleteTodo={handleToggleCompleteTodo}
            
          // />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
