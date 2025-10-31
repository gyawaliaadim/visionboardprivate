"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import clsx from "clsx";
import { Board } from "@/types/models";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { calculateNewPosition } from "@/app/lib/utils";
const boardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  position: z.number().min(0, "Position is required"),
});

type BoardFormValues = z.infer<typeof boardSchema>;

interface BoardFormProps {
  boardIndex:number;
  onCancel:()=>void;
  boardsList:Board[];
  TodoList:React.FC;
  boardTitle?:string;
  boardId?:string;
  boardStyles:string;
}

export default function BoardForm({
  boardIndex,
  onCancel,
  boardsList,
  TodoList,
  boardTitle,
  boardId,
  boardStyles
}
  : BoardFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BoardFormValues>({
    resolver: zodResolver(boardSchema),
    defaultValues: { title: boardTitle ?? "", position: 0 },
  });
const queryClient = useQueryClient();
const submit = async (data: BoardFormValues) => {
  console.log(data)
const newPos = calculateNewPosition(boardsList, boardIndex, data.position);
console.log("New position:", newPos);
console.log(boardIndex)
console.log(data.position)
console.log(boardsList[boardIndex])
console.log(boardsList[data.position])
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API}/boardDetails`,
    {
      id: boardId ?? "",
      title: data.title,
      position:newPos
    }
  );
  if (res.data.success){
     queryClient.invalidateQueries();
  }
  onCancel()
};


  return (
    <div
          className={boardStyles}
    >

    <form
      onSubmit={handleSubmit(submit)}
      // className={clsx(
      //   "w-[350px] p-4 rounded-lg shadow-lg",
      //   "bg-white text-black dark:bg-black dark:text-white"
      // )}
    >
      {/* Title */}
      <div className="mb-4">
        <Label htmlFor="title">Board Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Footer Row: Position + Cancel + Add */}
      <div className="flex items-center space-x-2">
        {/* Position */}
        <div className="flex-1 ">
          <Label htmlFor="position">Position</Label>
          <Select {...register("position")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {/* {Array.from({ length: maxPosition + 2 }).map((_, idx) => (
                <SelectItem key={idx} value={idx.toString()}>
                  {idx}
                </SelectItem>
              ))} */}
              {boardsList.map((board:Board,index:number)=>(
                 <SelectItem key={index} value={String(index)}>
                  {index+1}
                </SelectItem>
              ))}
              
            </SelectContent>
          </Select>
           {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
        </div>

        {/* Cancel */}
        <Button type="button" variant="outline" onClick={()=>onCancel()} className="mt-6 cursor-pointer">
          Cancel
        </Button>

        {/* Add Board */}
        <Button type="submit" className="cursor-pointer bg-green-600 hover:bg-green-700 text-white mt-6">
          {!boardId ? <>Add Board</> : <>Save Board</>}
        </Button>
      </div>
    </form>
    <TodoList/>
      </div>
  );
}
