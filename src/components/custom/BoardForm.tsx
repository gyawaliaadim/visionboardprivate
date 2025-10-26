"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import clsx from "clsx";

const boardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  position: z.number().min(0, "Position is required"),
});

type BoardFormValues = z.infer<typeof boardSchema>;

interface BoardFormProps {
  maxPosition?: number;
  onCancel: () => void;
  onSubmit: (data: BoardFormValues) => void;
}

export default function BoardForm({ maxPosition = 0, onCancel, onSubmit }: BoardFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BoardFormValues>({
    resolver: zodResolver(boardSchema),
    defaultValues: { title: "", position: 0 },
  });

  const submit = (data: BoardFormValues) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={clsx(
        "w-[350px] p-4 rounded-lg shadow-lg",
        "bg-white text-black dark:bg-black dark:text-white"
      )}
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
        <div className="flex-1">
          <Label htmlFor="position">Position</Label>
          <Select onValueChange={(value) => setValue("position", Number(value))} defaultValue="0">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: maxPosition + 2 }).map((_, idx) => (
                <SelectItem key={idx} value={idx.toString()}>
                  {idx}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cancel */}
        <Button type="button" variant="outline" onClick={onCancel} className="mt-6 cursor-pointer">
          Cancel
        </Button>

        {/* Add Board */}
        <Button type="submit" className="cursor-pointer bg-green-600 hover:bg-green-700 text-white mt-6">
          Add Board
        </Button>
      </div>
    </form>
  );
}
