"use client";

import { cn } from "@/lib/utils";
import { useGetTasksQuery, useUpdateTaskMutation } from "@/store/services/api";
import { Task as TasksTypes } from "@/types/Api-Types";
import { StatusType } from "@/types/types";
import { useParams } from "next/navigation";
import { useDrop } from "react-dnd";
import { CiSquarePlus } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";

// Main Board Component
function Board({
  setIsNewTaskPopUpOPen,
}: {
  setIsNewTaskPopUpOPen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = useParams<{ id: string }>();
  const [updateTaskStatus] = useUpdateTaskMutation()
  
  // Define task status columns
  const statusArray: StatusType[] = [
    "Work In Progress",
    "To Do",
    "Completed",
    "Under Review",
  ];

  // UPDATE TASK 
  const updateTask = ({id,status}:{id:number,status:StatusType})=>{
     updateTaskStatus({id,status})
  }

  // Fetch tasks data
  const {
    data: tasks,
  } = useGetTasksQuery({ projectId: id });

  console.log(tasks);

  return (
    <div>
      <div className="grid grid-col-1 md:grid-cols-2 gap-3 px-4 mt-4 ">
        {statusArray &&
          statusArray.map((status: StatusType) => (
            <GridColum
              key={status}
              status={status}
              tasks={tasks ? tasks : []}
              updateTask={updateTask}
              setIsNewTaskPopUpOPen={setIsNewTaskPopUpOPen}
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
  updateTask: ({id,status}:{id:number, status:StatusType})=> void;
  setIsNewTaskPopUpOPen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Grid Column Component - Droppable Area
const GridColum = ({
  setIsNewTaskPopUpOPen,
  status,
  tasks,
  updateTask
}: GridColumProps) => {
  // Setup drag and drop functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tasks",
    drop: (item: {id:number}) => updateTask({id:item.id, status}),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // FILTER TASKS 
   const filterTasks = tasks.filter(task => task.status === status)


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
          statusColor[status]
        )}
      >
        <p>{status}</p>
        <div className="flex justify-center items-center ">
          <button>
            <HiOutlineDotsVertical size={20} />
          </button>
          <button>
            <CiSquarePlus size={24} />
          </button>
        </div>
      </div>
      </div>

 )}
export default Board;