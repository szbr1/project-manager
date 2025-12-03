"use client";

import { cn } from "@/lib/utils";
import { useGetTasksQuery, useUpdateTaskMutation } from "@/store/services/api";
import { Task as TasksTypes } from "@/types/Api-Types";
import { CreateTaskInterface, StatusType } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { SetStateAction, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { CiSquarePlus } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import PopupCard from "./popup-card";

// Main Board Component
function Board({
  setIsNewTaskPopUpOPen,
}: {
  setIsNewTaskPopUpOPen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = useParams<{ id: string }>();
  const [updateTaskStatus] = useUpdateTaskMutation();
  const [currentTask, setCurrentTask] = useState<CreateTaskInterface>({
    title: "",
    description: "",
    priority: "Medium",
  });
  const [isCreateTaskPopupOpen, setIsCreateTaskPopup] = useState(false);
  // Define task status columns
  const statusArray: StatusType[] = [
    "Work In Progress",
    "To Do",
    "Completed",
    "Under Review",
  ];

  // UPDATE TASK
  const updateTask = ({ id, status }: { id: number; status: StatusType }) => {
    updateTaskStatus({ id, status });
  };

  // Fetch tasks data
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: id });

  console.log(tasks);

  return (
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

      <div className="grid grid-col-1 md:grid-cols-2 gap-3 px-4 mt-4 ">
        {statusArray &&
          statusArray.map((status: StatusType) => (
            <GridColum
              key={status}
              status={status}
              tasks={tasks ? tasks : []}
              updateTask={updateTask}
              setCurrentTask={setCurrentTask}
              setIsCreateTaskPopup={setIsCreateTaskPopup}
            />
          ))}
      </div>
    </div>
  );
}

// Grid Column Component Props
interface GridColumProps {
  tasks: TasksTypes[];
  status: StatusType;
  setCurrentTask: React.Dispatch<React.SetStateAction<CreateTaskInterface>>;
  updateTask: ({ id, status }: { id: number; status: StatusType }) => void;
  setIsCreateTaskPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

// Grid Column Component - Droppable Area
const GridColum = ({
  setIsCreateTaskPopup,
  setCurrentTask,
  status,
  tasks,
  updateTask,
}: GridColumProps) => {
  // Setup drag and drop functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tasks",
    drop: (item: { id: number }) => updateTask({ id: item.id, status }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // FILTER TASKS
  const filterTasks = tasks.filter((task) => task.status === status);

  // Status color mapping
  const statusColor = {
    "Work In Progress": "border-green-500",
    "To Do": "border-fuchsia-500",
    Completed: "border-indigo-500 ",
    "Under Review": "border-amber-500",
  };

  return (
    <div
      ref={(inline) => {
        drop(inline);
      }}
    >
      {/* Column Header */}
      <div
        className={cn(
          "flex justify-between my-2 py-3 items-center px-2 rounded-md border border-gray-300  border-s-16",
          statusColor[status],
        )}
      >
        <p>{status}</p>
        <div className="flex justify-center items-center ">
          <button>
            <HiOutlineDotsVertical size={20} />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              console.log("status:", status);
              setCurrentTask({ status });
              setIsCreateTaskPopup(true);
            }}
          >
            <CiSquarePlus size={24} />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className=" flex flex-col gap-3 ">
        {filterTasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};

const Task = ({ task }: { task: TasksTypes }) => {
  const tags = task.tags ? task?.tags.split(",") : [];
  const countComments = task.comments ? task.comments.length : 0;

  // Move useDrag here - inside the map
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tasks", // Changed from "task" to "tasks"
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      key={task.id}
      ref={(instance) => {
        drag(instance);
      }} // Attach drag ref directly
      className="py-4 border border-gray-300 dark:border-zinc-700 rounded-md px-3"
      style={{ opacity: isDragging ? 0.5 : 1 }} // Optional: visual feedback
    >
      {/* Priority and Tags */}
      <div
        className={cn(
          "flex items-center justify-between gap-1 py-px px-1 w-auto",
        )}
      >
        <div className="flex items-center gap-1">
          {/* Priority Badge */}
          <p
            className={cn(
              "flex items-center gap-1 py-px px-1 text-xs w-auto rounded-full",
              task.priority === "High" && "bg-amber-300 text-black/50",
              task.priority === "Low" && "bg-blue-300 text-black",
              task.priority === "Medium" && "bg-violet-300 text-black",
              task.priority === "Urgent" && "bg-red-300 text-black",
            )}
          >
            {task.priority}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-1">
            {tags.map((tag, index) => (
              <p
                key={index}
                className="flex items-center  py-px px-1 text-xs w-auto rounded-full bg-blue-100 dark:bg-blue-400 "
              >
                {tag}
              </p>
            ))}
          </div>
        </div>

        {/* More Options Button */}
        <button className="text-gray-600 dark:text-zinc-300">
          <HiOutlineDotsVertical size={14} />
        </button>
      </div>

      {/* Task Title */}
      <p className=" my-2">{task.title}</p>

      {/* Task Dates */}
      <p className="text-gray-600 text-xs dark:text-zinc-500">
        {task.startDate?.split("T")[0]} - {task.dueDate?.split("T")[0]}
      </p>

      {/* Task Description */}
      <p className="text-sm mb-3 dark:text-zinc-300">{task.description}</p>

      {/* Task Attachment */}
      {task && task.attachments && task.attachments.length ? (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          height={200}
          width={150}
          className="h-full w-full my-5 rounded-md shadown:sm"
          alt="attachment"
        />
      ) : null}

      <hr className="bg-gray-300 dark:bg-zinc-700" />

      {/* Task Footer - Assignees and Comments */}
      <div className="my-2 flex justify-between items-center">
        {/* Assignee and Author Avatars */}
        <div className="flex -space-x-3">
          {task && task.assignee && task.assignee.profilePictureUrl && (
            <Image
              src={`/${task.assignee.profilePictureUrl}`}
              height={30}
              width={30}
              className="bg-green-300 size-8 rounded-full"
              alt=""
            />
          )}

          {task && task.author && task.author.profilePictureUrl && (
            <Image
              src={`/${task.author.profilePictureUrl}`}
              height={30}
              width={30}
              className=" bg-red-300 size-8 rounded-full"
              alt=""
            />
          )}
        </div>

        {/* Comments Count */}
        <div className="flex justify-between items-center gap-1 bg-text-600 dark:text-zinc-500 ">
          <GoComment size={18} className="" />
          <p className="text-sm">{countComments}</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
