"use client";

import clsx from "clsx";
import TodoItem from "./TodoItem";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Board, Todo } from "@/types/models";
import { ReactNode } from "react";
interface BoardItemProps {
  boardTitle:string;
  boardPosition:number;
  TodoList:React.FC ;
  boards:Board[];
  handleEdit:()=>void
}

export default function BoardItem({
boardTitle,
boardPosition,
TodoList,
boards,
handleEdit

}: BoardItemProps) {
  const handleDeleteBoard = ()=>{}
  return (
    <div
      className={clsx(
        "w-[320px] p-4 rounded-xl shadow-lg  min-h-[150px] flex-wrap",
        "bg-gray-50 dark:bg-gray-900 text-black dark:text-white",
        "flex flex-col space-y-3"
      )}
    >
      {/* Board Header */}
      <div className="flex justify-between items-center">
        {/* Left: Position cube */}
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold rounded">
          {boardPosition}
        </div>

        {/* Right: Board actions */}
        <div className="flex space-x-2">
          <Button size="icon-sm" variant="outline" onClick={()=>handleEdit}>
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button size="icon-sm" variant="destructive" onClick={()=>handleDeleteBoard()}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Second row: Board title */}
      <h2 className="font-bold text-lg wrap-break-word">{boardTitle}</h2>

      <TodoList/>
   
    </div>
  );
}
