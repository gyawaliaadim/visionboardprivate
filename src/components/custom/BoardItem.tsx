"use client";

import clsx from "clsx";
import TodoItem from "./TodoItem";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Todo {
  id: string;
  position: number;
  title: string;
  description?: string;
  completed: boolean;
  xpReward: number;
}

interface BoardItemProps {
  title: string;
  position: number;
  todos: Todo[];
  onEditBoard: () => void;
  onDeleteBoard: () => void;
  onEditTodo: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
  onToggleCompleteTodo: (todoId: string) => void;
}

export default function BoardItem({
  title,
  position,
  todos,
  onEditBoard,
  onDeleteBoard,
  onEditTodo,
  onDeleteTodo,
  onToggleCompleteTodo,
}: BoardItemProps) {
  return (
    <div
      className={clsx(
        "w-[320px] p-4 rounded-xl shadow-lg",
        "bg-gray-50 dark:bg-gray-900 text-black dark:text-white",
        "flex flex-col space-y-3"
      )}
    >
      {/* Board Header */}
      <div className="flex justify-between items-center">
        {/* Left: Position cube */}
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold rounded">
          {position}
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
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            position={todo.position}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            xpReward={todo.xpReward}
            onEdit={() => onEditTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
            onToggleComplete={() => onToggleCompleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}
