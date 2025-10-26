"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/schema/schemas";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Board, Todo } from "@/types/models";
import clsx from "clsx";


export default function TodoForm(
  // { boards, onCancel, onSubmit }
  // : TodoFormProps

) {
  const boards: Board[] = [
    {
      id: "board-1",
      projectId: "proj-A",
      title: "To Do",
      position: 0,
      todos: [
        { id: "todo-1", boardId: "board-1", title: "Set up repo", description: "Initialize git, install dependencies", xpReward: 10, position: 0, completed: false },
        { id: "todo-2", boardId: "board-1", title: "Design schema", description: "Prisma models & relations", xpReward: 20, position: 1, completed: false },
      ],
    },
    {
      id: "board-2",
      projectId: "proj-A",
      title: "In Progress",
      position: 1,
      todos: [
        { id: "todo-3", boardId: "board-2", title: "Implement API endpoints", description: "CRUD for projects, boards, todos", xpReward: 30, position: 0, completed: false },
      ],
    },
    {
      id: "board-3",
      projectId: "proj-A",
      title: "Done",
      position: 2,
      todos: [
        { id: "todo-4", boardId: "board-3", title: "Create landing page", description: "", xpReward: 5, position: 0, completed: true },
      ],
    },
  ];

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: { boardId: "", position: 0, xpReward: 0, title: "", description: "" },
  });

  const submit = (data:any) => {
    console.log(data)
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
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} rows={3} />
      </div>

      {/* Row of three controls */}
      <div className="flex space-x-3 mb-4">
        {/* Group / Board */}
        <div className="flex-1 w-[37.5%]">
          <Label htmlFor="boardId">Board</Label>
          <Select {...register("boardId")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select board" />
            </SelectTrigger>
            <SelectContent>
              {boards.map((b: any) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.boardId && <p className="text-red-500 text-sm">{errors.boardId.message}</p>}
        </div>

        {/* Position */}
        <div className="flex-1 w-[37.5%]">
          <Label htmlFor="position">Position</Label>
          <Select {...register("position")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="eg. 1,5" />
            </SelectTrigger>
            <SelectContent>
              {boards.map((boardItem: Board) =>
                boardItem.todos.map((todoItem: Todo) => (
                  <SelectItem key={todoItem.id} value={todoItem.id}>
                    {todoItem.position}
                  </SelectItem>
                ))
              )}

            </SelectContent>
          </Select>
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
          {errors.xpReward && <p className="text-red-500 text-sm">{errors.xpReward.message}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => console.log("cancled")}>
          Cancel
        </Button>
        <Button type="submit" className="cursor-pointer bg-red-600 hover:bg-red-700 text-white">
          Add Todo
        </Button>
      </div>
    </form>
  );
}
