import { TasksBarChart } from "./_components/tasks-bar-chart";
import { TaskPieChart } from "./_components/tasks-pie-chart";
import TasksTable from "./_components/tasks-table";

function Page() {
  

  return (
    <div className="h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-2 gap-8 w-full p-2 overflow-y-auto bg-white text-black dark:bg-zinc-900 dark:text-zinc-100">
  <div className="h-full">
    <TaskPieChart />
  </div>
  <div className="h-full">
    <TasksBarChart />
  </div>
  <div className="lg:col-span-2 h-full">
    <TasksTable />
  </div>
</div>
  );
}

export default Page;
