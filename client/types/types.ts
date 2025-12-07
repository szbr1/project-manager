import { Priority, Status } from "./Api-Types";

export type MenuTypes = "Board" | "List" | "Timeline" | "Table";

export interface CreateProjectInterface {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface CreateTaskInterface {
  title: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  status?: Status;
  priority?: "Urgent" | "High" | "Medium" | "Low" | "";
  tags?: string;
}


export interface AllTasks {
  id: number,
  status?: Status,
  priority?: Priority
}