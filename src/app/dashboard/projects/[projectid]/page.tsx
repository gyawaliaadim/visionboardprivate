"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useSession } from "next-auth/react";
import { useNavigation } from "@/store/NavigationContext";
import BoardItem from "@/components/custom/BoardItem"; // adjust path if needed
import { Board } from "@/types/models";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
const ProjectPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = React.use(params);
  const { data: session, status } = useSession();
  const { navigate } = useNavigation();

  const fetchProjectById = async () => {
    if (!session?.user?.id) return null;

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/projects/projectDetails`,
        { params: { projectId, userId: session.user.id } }
      );
      // check ownership
      console.log(res.data.success)
      if (res.data.success) {
        return res.data.data;
      } else {
        // navigate("/dashboard");
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
    enabled: !!projectId && !!session?.user.id,
  });

  console.log(project)
  if (error || !project) return <div>Project not found or unauthorized</div>;

  const handleEditBoard = (boardId: string) => console.log("Edit board", boardId);
  const handleDeleteBoard = (boardId: string) => console.log("Delete board", boardId);
  const handleEditTodo = (todoId: string) => console.log("Edit todo", todoId);
  const handleDeleteTodo = (todoId: string) => console.log("Delete todo", todoId);
  const handleToggleCompleteTodo = (todoId: string) =>
    console.log("Toggle complete", todoId);

  return (
    <div className="w-full flex  flex-col">
      <div className="pt-5 pl-10 pr-10 text-2xl font-bold mb-4 flex w-full justify-between">
        <div>

          <h1 >{project.title}</h1>
          <p className="mb-6">Project ID: {projectId}</p>

        </div>
        <div className="flex space-x-2">
          <Button size="icon-sm" variant="outline" onClick={() => console.log("edit")}>
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button size="icon-sm" variant="destructive" onClick={() => console.log("delete")}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>


      <div className="pl-10 pr-10 mt-2 flex overflow-x-auto gap-4">
        {project.boards.map((board: Board, index: number) => (
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