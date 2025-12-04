export type MenuTypes = "Board" | "List" | "Timeline" | "Table";
export type StatusType =
  | "Work In Progress"
  | "To Do"
  | "Completed"
  | "Under Review";

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
  status?: StatusType;
  priority?: "Urgent" | "High" | "Medium" | "Low" | "";
  tags?: string;
}
