"use client";

import React from "react";

import {
  Table as CNTable,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTasksQuery } from "@/store/services/api";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Table({
  setIsNewtaskojectPopUpOPen,
}: {
  setIsNewtaskojectPopUpOPen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = useParams<{ id: string }>();
  const { data: tasks } = useGetTasksQuery({ projectId: id });


  return (
    <div>
      <div className="px-2 mt-5">
        <CNTable>
          <TableHeader>
            <TableHead className="w-[150px] font-bold">Title</TableHead>
            <TableHead className="text-start">Start</TableHead>
            <TableHead>Due</TableHead>
            <TableHead> Status</TableHead>
            <TableHead>Assigne</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Tags</TableHead>
          </TableHeader>
          <TableBody>
            {tasks &&
              tasks.map((task, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-semibold text-gray-800 dark:text-zinc-200">
                      {task.title}
                    </TableCell>
                    <TableCell className="text-start">
                      {task.startDate?.split("T")[0]}
                    </TableCell>
                    <TableCell>{task.dueDate?.split("T")[0]}</TableCell>

                    <TableCell>
                      <span
                        className={cn(
                          "lowercase rounded-full w-[70px]  px-2 py-0.5   dark:text-black",
                          task.status === "Completed" && "bg-green-200",
                          task.status === "To Do" && "bg-amber-200",
                          task.status === "Under Review" && "bg-pink-200",
                          task.status === "Work In Progress" && "bg-indigo-200",
                        )}
                      >
                        {task.status}
                      </span>
                    </TableCell>
                    <TableCell>{task.assignee?.username}</TableCell>
                    <TableCell>{task.author?.username}</TableCell>
                    <TableCell>{task.tags}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>
                <Button
                  onClick={() => setIsNewtaskojectPopUpOPen(true)}
                  className="cursor-pointer"
                >
                  Create Project
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </CNTable>
      </div>
    </div>
  );
}

export default Table;
