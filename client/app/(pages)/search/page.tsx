
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetTasksQuery, useSearchTaskMutation } from "@/store/services/api"
import Image from "next/image";
import { useState } from "react";

function Page() {
  const [searchText, setSearchText] = useState("");
  const [setSearchTask, {data:tasks}] =  useSearchTaskMutation();


  return (
    <div className="p-2 size-full">

      <div className="flex justify-center items-center w-full ">
         <div className=" flex justify-center items-center gap-3  mt-2">
           <Input placeholder="Search..." onChange={(e) => setSearchText(e.target.value)} className="w-[250px] md:w-[300px]lg:w-[350px]  " />
           <Button className="h-8" onClick={()=>{
            setSearchTask({searchTask: searchText})}}
            
            >Search</Button> 
            
         </div>
      </div>
      <hr className="bg-gray-300 dark:bg-zinc-700 my-3" />
      
      {/* <h3 className="text-xl md:text-3xl text-center py-3 font-semibold text-gray-300 dark:text-zinc-700">Search Projects , Users and Tasks</h3> */}
        
        <div className="grid sm:grid-cols-2 gap-2 overflow-y-auto h-full scroll pb-30">
          {tasks && tasks.map(item => (
            <div className="border-gray-300 dark:border-zinc-700 shadow-lg shadow-neutral-50/5 rounded-md p-2 border" key={item.id}>
              <p className="">Title: <span>{item.title}</span></p>
              <p className="" >Description: <span>{item.description}</span></p>
               <div className="flex justify-between items-center py-1 w-4/5 md:w-4/6 lg:w-4/7">
                <p>Start: <span className="text-sm">{item.startDate?.split("T")[0]}</span></p>
                <p>End: <span className="text-sm">{item.dueDate?.split("T")[0]}</span></p>
               </div>
               <p>Status: <span className="text-sm">{item.status}</span></p>
               <p>Tags: <span className="text-sm">{item.tags}</span></p>
               <p>Assigne: <span className="text-sm">{item?.assignee?.username}</span></p>
               <p>Author: <span className="text-sm">{item?.author?.username}</span></p>
               <p>Comments: <span className="text-sm">{item.comments?.length}</span></p>
               <p>Points: <span className="text-sm">{item.points}</span></p>
               <div className={`${item.attachments && item.attachments.length ? "" : "flex gap-1"} `}>
                <p>Attachement: </p>
                {
                  item.attachments && item.attachments.length ? (<Image src={`/${item?.attachments?.[0]?.fileURL}`} alt="" height={50} width={70} className="rounded-md" />
              ) : <span> 0</span>
                }
                 </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Page