"use client"
import { useGetTasksQuery } from '@/store/services/api'
import React from 'react'

function Page() {
  const {data, isSuccess} = useGetTasksQuery({projectId: "1"})

  console.log(data, "data is comming from tasks")
  console.log(isSuccess, "cheking")
  return (
   <div className="min-h-screen w-full p-2 bg-white text-black dark:bg-zinc-900 dark:text-zinc-100">

       Home
    </div>
  )
}

export default Page