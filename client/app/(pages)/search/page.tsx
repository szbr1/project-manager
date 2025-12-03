"use client";
import React, { useState, useMemo } from "react";

type ViewMode = "weekly" | "monthly" | "yearly";

interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export default function TimelineGrid() {
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");

  const projects: Project[] = [
    { id: 1, name: "Golu", startDate: "2025-01-11", endDate: "2026-07-12" },
    { id: 2, name: "Alpha", startDate: "2025-03-15", endDate: "2025-09-20" },
    { id: 3, name: "Beta", startDate: "2025-02-01", endDate: "2025-12-31" },
    { id: 4, name: "Gamma", startDate: "2025-06-10", endDate: "2026-01-15" },
    { id: 5, name: "Delta", startDate: "2025-04-05", endDate: "2025-11-25" },
  ];

  const generateColumns = useMemo(() => {
    const allDates = projects.flatMap((p) => [
      new Date(p.startDate),
      new Date(p.endDate),
    ]);
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

    const columns: { label: string; start: Date; end: Date }[] = [];

    if (viewMode === "weekly") {
      const current = new Date(minDate);
      current.setDate(current.getDate() - current.getDay());
      let weekNum = 1;
      const extendedMaxDate = new Date(maxDate);
      extendedMaxDate.setDate(extendedMaxDate.getDate() + 8 * 7); // Add 8 weeks

      while (current <= extendedMaxDate) {
        const weekEnd = new Date(current);
        weekEnd.setDate(weekEnd.getDate() + 6);
        columns.push({
          label: `Week ${weekNum}`,
          start: new Date(current),
          end: weekEnd,
        });
        current.setDate(current.getDate() + 7);
        weekNum++;
      }
    }

    if (viewMode === "monthly") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      const extendedMaxDate = new Date(maxDate);
      extendedMaxDate.setMonth(extendedMaxDate.getMonth() + 6); // Add 6 months

      while (current <= extendedMaxDate) {
        const monthEnd = new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          0,
        );
        columns.push({
          label: `${months[current.getMonth()]} ${current.getFullYear()}`,
          start: new Date(current),
          end: monthEnd,
        });
        current.setMonth(current.getMonth() + 1);
      }
    }

    if (viewMode === "yearly") {
      const startYear = minDate.getFullYear();
      const endYear = maxDate.getFullYear() + 3; // Add 3 extra years

      for (let year = startYear; year <= endYear; year++) {
        columns.push({
          label: year.toString(),
          start: new Date(year, 0, 1),
          end: new Date(year, 11, 31),
        });
      }
    }

    return columns;
  }, [viewMode, projects]);

  const isInRange = (
    projectStart: string,
    projectEnd: string,
    periodStart: Date,
    periodEnd: Date,
  ) => {
    const start = new Date(projectStart);
    const end = new Date(projectEnd);
    return start <= periodEnd && end >= periodStart;
  };

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();

    const totalDuration = end - start;
    const elapsed = now - start;
    const remaining = end - now;

    const progress = Math.max(
      0,
      Math.min(100, (elapsed / totalDuration) * 100),
    );

    const daysElapsed = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.floor(remaining / (1000 * 60 * 60 * 24));

    return {
      progress: progress.toFixed(1),
      daysElapsed: daysElapsed > 0 ? daysElapsed : 0,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      status:
        now < start ? "Not Started" : now > end ? "Completed" : "In Progress",
    };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-full w-[calc(100vw-200px)] bg-gray-50 p-8">
      <div className="w-full mt-12">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Project Timeline</h1>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as ViewMode)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-100 z-10 min-w-[120px]">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[130px]">
                  From
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[130px]">
                  To
                </th>
                {generateColumns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-2 py-3 text-center text-xs font-semibold text-gray-700 w-[50px] border-l border-gray-200"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const progressData = calculateProgress(
                  project.startDate,
                  project.endDate,
                );
                return (
                  <tr
                    key={project.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                      {project.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(project.startDate)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(project.endDate)}
                    </td>
                    {generateColumns.map((col, idx) => {
                      const inRange = isInRange(
                        project.startDate,
                        project.endDate,
                        col.start,
                        col.end,
                      );
                      return (
                        <td key={idx} className="px-0 py-3 relative group">
                          {inRange && (
                            <>
                              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-blue-500"></div>
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-20 w-48 bg-gray-900 text-white text-xs rounded py-2 px-3 shadow-lg">
                                <div className="font-semibold mb-1">
                                  {project.name}
                                </div>
                                <div className="text-gray-300">
                                  Status: {progressData.status}
                                </div>
                                <div className="text-gray-300">
                                  Progress: {progressData.progress}%
                                </div>
                                <div className="text-gray-300">
                                  Elapsed: {progressData.daysElapsed} days
                                </div>
                                <div className="text-gray-300">
                                  Remaining: {progressData.daysRemaining} days
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
