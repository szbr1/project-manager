import { useDrag, useDrop } from "react-dnd";
import { Status, Task } from "@/types/Api-Types";

export function useCustomDrop(
  status: Status,
  updateTask: (arg: { id: number; status: Status }) => void
) {
  const [{ isOver }, drop] = useDrop({
    accept: "tasks",
    drop: (item: { id: number }) => updateTask({ id: item.id, status }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return [ isOver, drop ] as const;
}


export function useCustomDrag(task: Task) {

    
  const [{ isDragging }, drag] = useDrag({
    type: "tasks",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return [isDragging, drag] as const
  
}