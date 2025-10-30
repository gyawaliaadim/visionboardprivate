"use client";

import clsx from "clsx";
import TodoItem from "./TodoItem";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
interface BoardItemProps {
  boardTitle?:string;
  TodoList:React.FC;
  handleEdit:()=>void;
  boardIndex:number;
  boardStyles:string
}
import React from 'react'


const BoardItem = ({
boardTitle,
TodoList,
handleEdit,
boardIndex,
boardStyles
}: BoardItemProps)=> {
  const handleDeleteBoard = ()=>{}
  return (
    <div
      className={boardStyles}
    >
      <div>
      {/* Board Header */}
      <div className="flex justify-between items-center">
        {/* Left: Position cube */}
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold rounded">
          {boardIndex}
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

        </div>
      <TodoList/>
   
    </div>
  );
}

export default BoardItem