"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

export const description = "A pie chart with no separator"

const chartData = [
  { browser: "chrome", groups: 275, fill: "var(--color-chrome)" },
  { browser: "safari", groups: 200, fill: "var(--color-safari)" },
  { browser: "firefox", groups: 187, fill: "var(--color-firefox)" },
  { browser: "edge", groups: 173, fill: "var(--color-edge)" },
  { browser: "other", groups: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  name: {
    label: "Name",
  },
  Completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  UnderReview: {
    label: "UUUUUUUUUUUUUUUU",
    color: "var(--chart-2)",
  },
  ToDo: {
    label: "Tooooooooo",
    color: "var(--chart-3)",
  },
  WorkInProgress: {
    label: "WorkInProgress",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function TaskPieChart() {

   const {data: tasks, isLoading, isError, error} = useGetAllTasksQuery();

   if(isLoading) {
    return <div className="center size-full">Loading...</div>
  }else if(isError){
     return <div className="center size-full">{RTKerror(error)}</div>
   }
   
   if(!tasks) return <div className="center size-full">No Task Found</div>

   const statusCount = tasks.reduce((acc, item) => {
  const s = item.status;
  acc[s] = (acc[s] || 0) + 1;
  return acc;
}, {});

const statusValues = Object.keys(statusCount)

const dataArray = statusValues.map(item => ({
  name: item,
  quantity: statusCount[item],
  fill: `var(--color-${item.replace(/\s/g, '')})`
}))


  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tasks Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dataArray}
              dataKey="quantity"
              nameKey="name"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
