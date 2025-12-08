"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetAllTasksQuery } from "@/store/services/api"
import { RTKerror } from "@/utility/rtk-error"

export const description = "A bar chart with a label"


const chartConfig = {
  priority: {
    label: "Name",
  },
  High: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  Low: {
    label: "UUUUUUUUUUUUUUUU",
    color: "var(--chart-2)",
  },
  Medium: {
    label: "Tooooooooo",
    color: "var(--chart-3)",
  },
  Urgent: {
    label: "WorkInProgress",
    color: "var(--chart-4)",
  },
  Backlog: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function TasksBarChart() {

   
      const {data: tasks, isLoading, isError, error} = useGetAllTasksQuery();
      if(isLoading) {
       return <div className="center size-full">Loading...</div>
     }else if(isError){
        return <div className="center size-full">{RTKerror(error)}</div>
      }
      
      if(!tasks) return <div className="center size-full">No Task Found</div>
  
   const priorityCount = tasks.reduce((acc, item) => {
  const p = item.priority;
  acc[p] = (acc[p] || 0) + 1;
  return acc;
}, {});


const priorityValues = Object.keys(priorityCount)

const dataArray = priorityValues.map(item => ({
  priority: item,
  Quantity: priorityCount[item],
  fill: `var(--color-${item.replace(/\s/g, '')})`
}))

console.log({
  tasks,
  dataArray,
  priorityValues,
  priorityCount
})
  return (
    

    <Card>
      <CardHeader>
        <CardTitle>Tasks Priorities</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dataArray}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="priority"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Quantity" radius={0}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
