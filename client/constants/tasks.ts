import { Priority, Status } from "@/types/Api-Types";

  const TASK_STATUS : Status[] = [
    Status.WorkInProgress,
    Status.ToDo,
    Status.Completed,
    Status.UnderReview,
  ];

  const TASK_STATUS_COLOR: Record<Status, string> = {
    ["Work In Progress"] : "border-purple-800",
    ["To Do"] : "border-amber-800",
    ["Completed"] : "border-green-800",
    ["Under Review"] :"border-pink-800",
  }

  const TASK_STATUS_BG : Record<Status, string> = {
    ["Work In Progress"] : "bg-purple-200",
    ["To Do"] : "bg-amber-200",
    ["Completed"] : "bg-green-200",
    ["Under Review"] :"bg-pink-200",
  }

  const TASK_PRIORITY_COLOR : Record<Priority ,string> = {
    ["Urgent"]: "bg-red-300",
    ["High"]: "bg-orange-300",
    ["Medium"]: "bg-blue-300",
    ["Low"]: "bg-slate-300",
    ["Backlog"]: "bg-green-300",
    
  }



export {TASK_STATUS, TASK_STATUS_COLOR, TASK_PRIORITY_COLOR, TASK_STATUS_BG}  