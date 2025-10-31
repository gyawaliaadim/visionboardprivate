"use client";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Board, Todo } from "@/types/models";
import clsx from "clsx";
import { useEffect, useState } from 'react';
import { calculateNewPosition } from '@/app/lib/utils';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";

const todoSchema = z.object({
  boardId: z.string().min(1, "Board is required"),
  todoIndex: z.number().min(0, "Position must be ≥ 0"),
  xpReward: z.number().min(0, "XP Reward must be ≥ 0"),
  todoTitle: z.string().min(1, "Title is required"),
  todoDescription: z.string().optional(),
});

interface TodoFormProps {
  todoTitle?: string;
  todoDescription?: string;
  todoId?: string;
  xpReward?: number;
  todoIndex: number;
  todosList?: Todo[];
  boardIndex: number;
  boardId: string;
  boardsList: Board[];

  onCancel: () => void;
}

export default function TodoForm({
  todoTitle,
  todoDescription,
  todoId,
  todoIndex,
  boardId,
  boardsList,
  xpReward,
  onCancel,
  todosList
}: TodoFormProps) {
const queryClient = useQueryClient();
  const [selectedBoard, setSelectedBoard] = useState<Board | undefined>();
  const { register, handleSubmit, setValue, formState: { errors }, watch, trigger } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: { boardId: boardId ?? "", todoIndex: todoIndex ?? 0, xpReward: xpReward ?? 0, todoTitle: todoTitle ?? "", todoDescription: todoDescription ?? "" },
  });

  const boardIdForm = watch("boardId");
  const todoIndexForm = watch("todoIndex");

  useEffect(() => {
    const boardFound = boardsList.find(board => board.id === boardIdForm);
    setSelectedBoard(boardFound);
    // console.log(boardFound);
  }, [boardIdForm, boardsList]);

  const submit = async (data: any) => {
    const selectedBoard = boardsList.find(board => board.id == data.boardId)
    const newPos = calculateNewPosition(selectedBoard?.todos, 0, data.position);
    console.log("New position:", newPos);
    console.log(todoIndex)
    console.log(data.position)
    console.log(todosList? todosList[todoIndex].position:null)
    console.log(boardsList[data.position])
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/todoDetails`,
        {
         id: todoId,
         boardId:data.boardId,
         position:newPos,
         xpReward: data.xpReward,
         title:data.todoTitle,
         description:data.description
        }
      );
      if (res.data.success){
         queryClient.invalidateQueries();
      }
      onCancel()
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={clsx(
        "w-[300px] min-h-[220px] p-4 rounded-lg shadow-lg",
        "bg-white text-black dark:bg-black dark:text-white"
      )}
    >
      {/* Title */}
      <div className="mb-4">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("todoTitle")} />
        {errors.todoTitle && <p className="text-red-500 text-sm">{errors.todoTitle.message as string}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("todoDescription")} rows={3} />
      </div>

      {/* Row of three controls */}
      <div className="flex space-x-3 mb-4">
        {/* Group / Board */}
        <div className="flex-1 w-[37.5%]">
          <Label htmlFor="boardId">Board</Label>
          <Select
            value={boardIdForm}
            onValueChange={(value) => {
              setValue("boardId", value, { shouldValidate: true });
              trigger("boardId");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select board" />
            </SelectTrigger>
            <SelectContent>
              {boardsList.map((b: Board, index: number) => (
                <SelectItem key={b.id} value={b.id}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.boardId && <p className="text-red-500 text-sm">{errors.boardId.message as string}</p>}
        </div>

        {/* Position */}
        <div className="flex-1 w-[37.5%]">
          <Label htmlFor="todoIndex">Position</Label>
          <Select
            value={String(todoIndexForm)}
            onValueChange={(value) => {
              setValue("todoIndex", Number(value), { shouldValidate: true });
              trigger("todoIndex");
            }}
            disabled={!boardIdForm}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="eg. 1,5" />
            </SelectTrigger>
            <SelectContent>
              {selectedBoard?.todos?.map((todoItem: Todo, index: number) => (
                <SelectItem key={todoItem.id} value={String(index)}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.todoIndex && <p className="text-red-500 text-sm">{errors.todoIndex.message as string}</p>}
        </div>

        {/* XP Reward */}
        <div className="w-[25%] ">
          <Label htmlFor="xpReward">XP</Label>
          <div>
            <Input
              id="xpReward"
              type="number"
              {...register("xpReward", { valueAsNumber: true })}
              className="w-full bg-linear-to-r from-[#374893] to-[#a94a79] text-white hover:scale-110 focus:shadow-[0_0_30px_rgba(200,110,180,0.9)] hover:shadow-[0_0_30px_rgba(200,110,180,0.9)] focus:brightness-120 hover:brightness-120   before:absolute before:inset-0 before:rounded-2xl
    before:bg-linear-to-tr before:from-[#374893]/50 before:to-[#a94a79]/50
    before:blur-xl before:opacity-75 before:pointer-events-none transition-all duration-200 ease-out"
            />
          </div>
          {errors.xpReward && <p className="text-red-500 text-sm">{errors.xpReward.message as string}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button type="submit" className="cursor-pointer bg-red-600 hover:bg-red-700 text-white">
          {!todoId ? <>Add Todo</> : <>Save Todo</>}
        </Button>
      </div>
    </form>
  );
}