"use client"
import { useGetProjectsQuery } from '@/store/services/api'
import { Project } from "@/types/Api-Types"
import React from 'react'
import { useDrag } from "react-dnd"

// Draggable Item Component
function DraggableProject({ project }: { project: Project }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "PROJECT", // string constant
    item: { id: project.id, name: project.name }, // data you want to pass
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [project])

  return (
    <div
      ref={dragRef}
      className='py-2 w-70 rounded-sm border border-gray-300'
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {project.name}
    </div>
  )
}

function Page() {
  const { data: projects } = useGetProjectsQuery()

  return (
    <div className='center size-full'>
      {projects && projects.map((project) => (
        <DraggableProject key={project.id} project={project} />
      ))}
    </div>
  )
}

export default Page