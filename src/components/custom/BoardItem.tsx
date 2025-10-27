"use client";

import clsx from "clsx";
import TodoItem from "./TodoItem";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Board, Todo } from "@/types/models";
interface BoardItemProps {
  title: string;
  todos: Todo[];
  boards: Board[];
  onEditBoard: () => void;
  onDeleteBoard: () => void;
  onEditTodo: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
  onToggleCompleteTodo: (todoId: string) => void;
  boardIndex: number;
  boardId:string;
}

export default function BoardItem({
  title,
  todos,
  boards,
  onEditBoard,
  onDeleteBoard,
  boardIndex,
  boardId
}: BoardItemProps) {
  return (
    <div
      className={clsx(
        "w-[320px] p-4 rounded-xl shadow-lg  min-h-[150px]",
        "bg-gray-50 dark:bg-gray-900 text-black dark:text-white",
        "flex flex-col space-y-3"
      )}
    >
      {/* Board Header */}
      <div className="flex justify-between items-center">
        {/* Left: Position cube */}
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold rounded">
          {boardIndex}
        </div>

        {/* Right: Board actions */}
        <div className="flex space-x-2">
          <Button size="icon-sm" variant="outline" onClick={onEditBoard}>
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button size="icon-sm" variant="destructive" onClick={onDeleteBoard}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Second row: Board title */}
      <h2 className="font-bold text-lg break-words">{title}</h2>

      {/* Todos */}
      <div className="flex flex-col space-y-2">
        {todos.sort((a,b)=>a.position-b.position).map((todo, index) => (
          <TodoItem
          boardId={boardId}
          todoId={todo.id}
          boardIndex={boardIndex}
            key={todo.id}
            todoIndex={index+1}
            title={todo.title}
            description={todo.description ?? ""}
            completed={todo.completed}
            xpReward={todo.xpReward}
            boards={boards}

          />
        ))}
      </div>
    </div>
  );
}
