"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { PencilIcon, TrashIcon } from "lucide-react"; // or your preferred SVG icon

interface TodoItemProps {
  position: number;
  title: string;
  description?: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
  xpReward: number;
  onToggleComplete: () => void;
}

export default function TodoItem({
  position,
  title,
  description,
  completed,
  onEdit,
  onDelete,
  xpReward,
  onToggleComplete,
}: TodoItemProps) {
  return (
    <div
      className={clsx(
        "w-[300px] p-4 rounded-lg shadow-lg",
        "bg-white text-black dark:bg-black dark:text-white",
        "flex flex-col space-y-2"
      )}
    >
      {/* Row 1: Position left, actions right */}
      <div className="flex justify-between items-center">
        {/* Position cube */}
        <div className="flex-shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white flex items-center justify-center font-bold rounded">
          {position}
        </div>

        {/* Actions: Edit, Delete, XP/Complete */}
        <div className="flex items-center space-x-2">
          <Button size="icon-sm" variant="outline" onClick={onEdit}>
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button size="icon-sm" variant="destructive" onClick={onDelete}>
            <TrashIcon className="w-4 h-4" />
          </Button>
          <Button
            size="icon-sm"
            onClick={onToggleComplete}
            className={clsx(
              "bg-gradient-to-r from-[#374893] to-[#a94a79] text-white",
              "hover:scale-110 focus:shadow-[0_0_30px_rgba(200,110,180,0.9)] hover:shadow-[0_0_30px_rgba(200,110,180,0.9)]",
              "focus:brightness-110 hover:brightness-110",
              "transition-all duration-200 ease-out rounded cursor-pointer"
            )}
          >
            {completed ? "Completed" : `${xpReward}`}
          </Button>
        </div>
      </div>

      {/* Row 2: Title */}
      <div className="font-semibold break-words">{title}</div>

      {/* Row 3: Description */}
      {description && (
        <div className="text-sm text-gray-700 dark:text-gray-300 break-words">
          {description}
        </div>
      )}
    </div>
  );
}
