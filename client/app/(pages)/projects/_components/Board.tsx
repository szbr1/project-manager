"use client";

import { cn } from "@/lib/utils";
import { useGetTasksQuery, useUpdateTaskMutation } from "@/store/services/api";
import { Task as TasksTypes } from "@/types/Api-Types";
import { CreateTaskInterface, StatusType } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { CiSquarePlus } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import PopupCard from "./popup-card";
import ErrorBoundary from "@/components/error-boundary";

// -------------------- MAIN BOARD --------------------
function Board() {
  const { id } = useParams(); // fixed typo

  const [updateTaskStatus] = useUpdateTaskMutation();

  const [currentTask, setCurrentTask] = useState<CreateTaskInterface>({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
  });

  const [isCreateTaskPopupOpen, setIsCreateTaskPopup] = useState(false);

  const statusArray: StatusType[] = [
    "Work In Progress",
    "To Do",
    "Completed",
    "Under Review",
  ];

  const updateTask = ({ id, status }: { id: number; status: StatusType }) => {
    debugger
    updateTaskStatus({ id, status });
  };

  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: id as string });

  const crash = (null as any).toString(); 

  if(isLoading){
    return <div className="flex justify-center items-center size-full">Loading...</div>
  }else if(isError){
    return <div className="flex justify-center items-center size-full">Error While Fetching Date.</div>
  }

  return (

      <ErrorBoundary>
    <div>

      <PopupCard
        buttonText="Create Task"
        description="Create task and manage it or assign it."
        title="Create New Task"
        isPopupOpen={isCreateTaskPopupOpen}
        taskDetails={currentTask}
        setTaskDetails={setCurrentTask}
        createTask={true}
        setPopupOpen={setIsCreateTaskPopup}
        />

      <div className="grid grid-col-1 md:grid-cols-2 gap-3 px-4 mt-4">
        {statusArray.map((status: StatusType) => (
          <GridColumn
          key={status}
          status={status}
          tasks={tasks ?? []}
          updateTask={updateTask}
          setCurrentTask={setCurrentTask}
          setIsCreateTaskPopup={setIsCreateTaskPopup}
          />
        ))}
      </div>
    </div>
        </ErrorBoundary>
  );
}

// -------------------- GRID COLUMN --------------------
interface GridColumnProps {
  tasks: TasksTypes[];
  status: StatusType;
  setCurrentTask: React.Dispatch<React.SetStateAction<CreateTaskInterface>>;
  updateTask: ({ id, status }: { id: number; status: StatusType }) => void;
  setIsCreateTaskPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const GridColumn = ({
  status,
  tasks,
  updateTask,
  setCurrentTask,
  setIsCreateTaskPopup,
}: GridColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "tasks",
    drop: (item: { id: number }) => updateTask({ id: item.id, status }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const filteredTasks = tasks.filter((task) => task.status === status);

  const statusColor = {
    "Work In Progress": "border-green-500",
    "To Do": "border-fuchsia-500",
    Completed: "border-indigo-500",
    "Under Review": "border-amber-500",
  };

  return (
    <div ref={(instance)=>{
      drop(instance)
    }}>
      {/* Header */}
      <div
        className={cn(
          "flex justify-between my-2 py-3 items-center px-2 rounded-md border border-gray-300 border-s-16",
          statusColor[status]
        )}
      >
        <p>{status}</p>
        <div className="flex items-center gap-2">
          <button>
            <HiOutlineDotsVertical size={20} />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              setCurrentTask((prev) => ({ ...prev, status }));
              setIsCreateTaskPopup(true);
            }}
          >
            <CiSquarePlus size={24} />
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-3">
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

// -------------------- TASK CARD --------------------
const Task = ({ task }: { task: TasksTypes }) => {
  const tags = task.tags ? task.tags.split(",") : [];
  const commentCount = task.comments?.length ?? 0;

  const [{ isDragging }, drag] = useDrag({
    type: "tasks",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(instance)=>{
        drag(instance)
      }}
      className="py-4 border border-gray-300 dark:border-zinc-700 rounded-md px-3"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Priority & Tags */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "py-px px-2 text-xs rounded-full",
              task.priority === "High" && "bg-amber-300 text-black/50",
              task.priority === "Low" && "bg-blue-300 text-black",
              task.priority === "Medium" && "bg-violet-300 text-black",
              task.priority === "Urgent" && "bg-red-300 text-black"
            )}
          >
            {task.priority}
          </p>

          <div className="flex items-center gap-1">
            {tags.map((tag, index) => (
              <p
                key={index}
                className="py-px px-2 text-xs rounded-full bg-blue-100 dark:bg-blue-400"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>

        <button className="text-gray-600 dark:text-zinc-300">
          <HiOutlineDotsVertical size={14} />
        </button>
      </div>

      {/* Title */}
      <p className="my-2">{task.title}</p>

      {/* Dates */}
      <p className="text-gray-600 text-xs dark:text-zinc-500">
        {task.startDate?.split("T")[0]} - {task.dueDate?.split("T")[0]}
      </p>

      {/* Description */}
      <p className="text-sm mb-3 dark:text-zinc-300">{task.description}</p>

      {/* Attachment */}
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          height={200}
          width={150}
          className="w-full h-full my-5 rounded-md shadow-sm"
          alt="attachment"
        />
      )}

      <hr className="bg-gray-300 dark:bg-zinc-700" />

      {/* Footer */}
      <div className="my-2 flex justify-between items-center">
        <div className="flex -space-x-3">
          {task.assignee?.profilePictureUrl && (
            <Image
              src={`/${task.assignee.profilePictureUrl}`}
              height={30}
              width={30}
              className="size-8 rounded-full bg-green-300"
              alt=""
            />
          )}

          {task.author?.profilePictureUrl && (
            <Image
              src={`/${task.author.profilePictureUrl}`}
              height={30}
              width={30}
              className="size-8 rounded-full bg-red-300"
              alt=""
            />
          )}
        </div>

        <div className="flex items-center gap-1 text-gray-600 dark:text-zinc-500">
          <GoComment size={18} />
          <p className="text-sm">{commentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
