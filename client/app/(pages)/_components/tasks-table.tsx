"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTasksQuery } from "@/store/services/api";
import { RTKerror } from "@/utility/rtk-error";

function TasksTable() {
  const { data: tasks, isLoading, isError, error } = useGetAllTasksQuery();
  if (isLoading) {
    return <div className="center size-full">Loading...</div>;
  } else if (isError) {
    return <div className="center size-full">{RTKerror(error)}</div>;
  }

  if (!tasks) return <div className="center size-full">No Task Found</div>;

  return (
    <div className="h-[270px] w-full overflow-y-scroll col-span-2 p-3 border border-gray-300 dark:border-zinc-300 rounded-lg shadow-lg dark:shadow-zinc-600 scroll ">
        <p className="font-bold py-3 text-3xl ">Tasks</p>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map(task => (
            <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
  );
}

export default TasksTable;
