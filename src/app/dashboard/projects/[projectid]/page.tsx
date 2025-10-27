"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useSession } from "next-auth/react";
import { useNavigation } from "@/store/NavigationContext";
import BoardItem from "@/components/custom/BoardItem"; // adjust path if needed
import { Board } from "@/types/models";

const ProjectPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = React.use(params);
  const { data: session, status } = useSession();
  const { navigate } = useNavigation();

  const fetchProjectById = async () => {
    if (!session?.user?.id) return null;

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/projects/projectDetails`,
        { params: { projectId } }
      );
      // check ownership
      if (res.data.data.userId === session.user.id) {
        return res.data.data;
      } else {
        navigate("/dashboard");
        return null;
      }
    } catch {
      navigate("/dashboard");
      return null;
    }
  };

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: fetchProjectById,
    enabled: !!projectId && status === "authenticated",
  });

  if (isLoading) return <div>Loading project...</div>;
  if (error || !project) return <div>Project not found or unauthorized</div>;

  const handleEditBoard = (boardId: string) => console.log("Edit board", boardId);
  const handleDeleteBoard = (boardId: string) => console.log("Delete board", boardId);
  const handleEditTodo = (todoId: string) => console.log("Edit todo", todoId);
  const handleDeleteTodo = (todoId: string) => console.log("Delete todo", todoId);
  const handleToggleCompleteTodo = (todoId: string) =>
    console.log("Toggle complete", todoId);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      <p className="mb-6">Project ID: {projectId}</p>

      <div className="flex overflow-x-auto gap-4">
        {project.boards.map((board:Board, index:number) => (
          <BoardItem
            key={board.id}
            title={board.title}
            position={index + 1}
            todos={board.todos}
            onEditBoard={() => handleEditBoard(board.id)}
            onDeleteBoard={() => handleDeleteBoard(board.id)}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
            onToggleCompleteTodo={handleToggleCompleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
