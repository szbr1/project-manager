"use client";
import { useGetTasksQuery } from "@/store/services/api";
import React from "react";

const Page = () => {
  const { data: tasks } = useGetTasksQuery({ projectId: "2" });

  if (!tasks || tasks.length === 0) return <div>Loading</div>;

  const allDates = tasks.flatMap((t) => [
    new Date(t.startDate!),
    new Date(t.dueDate!),
  ]);
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

  const getMonths = () => {
    const months = [];
    const current = new Date(minDate);
    current.setDate(1);

    while (current <= maxDate) {
      months.push({
        name: current.toLocaleDateString("en", {
          month: "short",
          year: "numeric",
        }),
        date: new Date(current),
      });
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  const months = getMonths();
  const totalDays = Math.ceil(
    (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const getTaskStyle = (task: any) => {
    const startDate = new Date(task.startDate!);
    const endDate = new Date(task.dueDate!);

    const startOffset = Math.ceil(
      (startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const duration = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;

    return {
      left: `${left}%`,
      width: `${width}%`,
      backgroundColor: task.status === "Completed" ? "#10b981" : "#3b82f6",
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Project Timeline
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <div className="w-64 p-4 bg-gray-50 font-semibold border-r border-gray-200">
              Task Name
            </div>
            <div className="flex-1 flex">
              {months.map((month, i) => (
                <div
                  key={i}
                  className="flex-1 p-4 text-center font-semibold bg-gray-50 border-r border-gray-200"
                >
                  {month.name}
                </div>
              ))}
            </div>
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="w-64 p-4 border-r border-gray-200 flex items-center">
                <span className="font-medium text-gray-700">{task.title}</span>
              </div>

              <div className="flex-1 relative p-2">
                <div
                  className="absolute h-8 rounded-md flex items-center px-3 text-white text-sm font-medium transition-all hover:opacity-80"
                  style={getTaskStyle(task)}
                  title={`${task.startDate} to ${task.dueDate}`}
                >
                  <span className="truncate">{task.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
