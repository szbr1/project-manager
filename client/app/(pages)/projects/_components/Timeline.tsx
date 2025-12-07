import { useGetTasksQuery } from "@/store/services/api";
import { useParams } from "next/navigation";
import React from "react";

function Timeline() {

  const {id} = useParams<{id:string}>()
  
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: id as string });

  if (isLoading) {
    return <div className="center size-full">Loading...</div>;
  } else if (isError) {
    return (
      <div className="center size-full">Error occured while fetching.</div>
    );
  }

  return (
    <div className="flex items-center py-8 h-full w-full flex-col p-5">
      <p className="text-3xl font-semibold text-start w-full mb-3">Timeline</p>
      <div className="overflow-x-auto w-full scroll">

        

   
      <div className="grid grid-cols-6  auto-rows-min min-w-[800px]  dark:bg-zinc-850  border-y border-gray-500 ">
        {/* // Header Row  */}
        <div className="contents bg-amber-50 realtive">
          <div className="col-span-1 h-14 w-full  center bg-gray-500 dark:bg-zinc-700 text-gray-200 font-semibold ">
            Title
          </div>
          <div className="col-span-1 h-14 w-full  center bg-gray-500 dark:bg-zinc-700 text-gray-200 font-semibold ">
            Start
          </div>
          <div className="col-span-1 h-14 w-full  center bg-gray-500 dark:bg-zinc-700 text-gray-200 font-semibold ">
            Due
          </div>
          <div className="col-span-3 w-full h-14   center bg-gray-500 dark:bg-zinc-700 text-gray-200 font-semibold ">
            Progress
          </div>
        </div>
        {/* Other Rows  */}
        {tasks &&
          tasks.map((item) => {
            if(!item.startDate || !item.dueDate) return;
            const totalDuration = new Date(item.dueDate).getTime() - new Date(item.startDate).getTime();
            const elapsedDuration = new Date().getTime() - new Date(item.startDate).getTime();
            let percent = (elapsedDuration / totalDuration) * 100;

    // clamp 0–100
           percent = Math.min(Math.max(percent, 0), 100);

            return (
              <div className="contents" key={item.id}>
                <div className="col-span-1 h-14 w-full border-x center dark:text-gray-200 dark:dark-zinc-700 border-gray-500 ">
                  {item.title}
                </div>
                <div className="col-span-1 h-14 w-full  center dark:text-gray-200 dark:dark-zinc-700 border-gray-500 border-r">
                   {new Date(item.startDate).toLocaleDateString("en-US", {day:"2-digit", month:"short", year:"numeric"})}
                </div>
                <div className="col-span-1 h-14 w-full  center dark:text-gray-200 dark:dark-zinc-700 border-gray-500 border-r">
                  {new Date(item.dueDate).toLocaleDateString("en-US", {day:"2-digit", month:"short", year:"numeric"})}
                </div>
                <div className="col-span-3 h-14 w-full  flex justify-start items-center py-1 px-1 dark:text-gray-200 dark:dark-zinc-700 border-gray-500 border-r">
                  <p style={{width: ` ${percent}%`}} className="h-full center bg-blue-300 text-blue-300 hover:text-black   rounded-l-md">{percent}</p>
                </div>
              </div>
            );
          })}
      </div>
   </div>
     
    </div>
  );
}

export default Timeline;
