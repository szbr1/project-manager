"use client";
import { useGetTasksQuery } from "@/store/services/api";
import Image from "next/image";
import { useParams } from "next/navigation";

function List() {
  const { id } = useParams<{ id: string }>();
  const {
    data: tasks,
    isError,
    isLoading,
  } = useGetTasksQuery({ projectId: id });

   if(isLoading){
    return <div className="flex justify-center items-center size-full">Loading...</div>
  }else if(isError){
    return <div className="flex justify-center items-center size-full">Error While Fetching Date.</div>
  }

  return (
    <div className="px-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
        {tasks &&
          tasks.map((task) => {
            return (
              <div
                className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm hover:shadow-md transition-all "
                key={task.id}
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <span
                    className="px-3 py-1 text-xs rounded-full capitalize 
                  bg-blue-100 dark:bg-blue-800 dark:text-blue-100 text-blue-700"
                  >
                    {task.status}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    {task.assignee && task.assignee.profilePictureUrl && (
                      <Image
                        src={`/${task.assignee.profilePictureUrl}`}
                        height={30}
                        width={30}
                        className="rounded-full size-10"
                        alt="Assignee"
                      />
                    )}

                    <p className="text-sm">
                      <span className="text-gray-500">Assigned to:</span>{" "}
                      <span className="font-medium">
                        {task.assignee?.username || "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {task.author && task.author.profilePictureUrl && (
                      <Image
                        src={`/${task.author.profilePictureUrl}`}
                        height={30}
                        width={30}
                        className="rounded-full size-10"
                        alt="Author"
                      />
                    )}

                    <p className="text-sm">
                      <span className="text-gray-500">Author:</span>{" "}
                      <span className="font-medium">
                        {task.author?.username || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {task.description}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <p>
                    <span className="text-gray-500">Priority:</span>{" "}
                    <span className="font-medium">{task.priority}</span>
                  </p>

                  <p>
                    <span className="text-gray-500">Start Date:</span>{" "}
                    {task.startDate?.split("T")[0]}
                  </p>

                  <p>
                    <span className="text-gray-500">Due Date:</span>{" "}
                    {task.dueDate?.split("T")[0]}
                  </p>
                </div>

                {/* Attachments */}
                {task.attachments && task.attachments?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Attachment:</p>
                    {task.attachments && (
                      <Image
                        className="rounded-md mt-2 border border-gray-200 dark:border-zinc-700"
                        src={`/${task.attachments[0].fileURL}`}
                        height={70}
                        width={70}
                        alt="Attachment"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default List;
