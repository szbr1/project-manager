import {
  AdminDetailsTeam,
  Project,
  Status,
  Task,
  User,
} from "@/types/Api-Types";
import { AllTasks } from "@/types/types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_API_BASE_URL,
  }),
  tagTypes: ["Projects", "Tasks", "Users", "Teams", "AllTasks"],

  endpoints: (build) => ({
    // FETCH LIST OF PROJECTS
    getProjects: build.query<Project[], void>({
      query: () => "api/project/getProjects",
      providesTags: (result: Project[] | undefined) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Projects" as const, id })),
              "Projects",
            ]
          : ["Projects"],
    }),

    //  CREATE ONE PROJECT
    createProject: build.mutation<Project, Partial<Project>>({
      query: (data) => ({
        url: "api/project/createProject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),

    //  FETCH TASKS
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `api/task/getTasks?projectId=${projectId}`,
      providesTags: (result: Task[] | undefined) =>
        result
          ? [...result.map(({ id }) => ({ type: "Tasks" as const, id }))]
          : ["Tasks"],
    }),

    // FETCH ALL THE TASKS
    getAllTasks: build.query<AllTasks[], void>({
      query: () => "api/task/getAllTasks",
      providesTags: ["AllTasks"],
    }),

    //  CREATE ONE TASK
    createTask: build.mutation<Task, Partial<Task>>({
      query: (data: Task) => ({
        url: "api/task/createTask",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // UPDATE ONE TASK DRAG
    updateTask: build.mutation<
      Task,
      { id: number; status: Status; projectId: number }
    >({
      query: ({ id, status }) => ({
        url: `api/task/${id}/updateTask`,
        body: { status },
        method: "PATCH",
      }),
      async onQueryStarted(
        { id, status, projectId },
        { dispatch, queryFulfilled },
      ) {
        const patchUpdate = dispatch(
          api.util.updateQueryData("getTasks", { projectId }, (draft) => {
            const task = draft.find((t) => t.id == id);
            if (task) {
              task.status = status;
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchUpdate.undo();
        }
      },
    }),

    getUserTasks: build.query<Task[], { userId: number }>({
      query: ({userId}) => `api/task/${userId}/getUserTasks`,
    }),

    // SEARCH TASK
    searchTask: build.mutation<Task[], { searchTask: string }>({
      query: ({ searchTask }) => {
        return {
          body: { searchTask },
          url: "api/search/searchTask",
          method: "POST",
        };
      },
      invalidatesTags: (result, error, { searchTask }) => [
        { type: "Tasks", searchTask },
      ],
    }),

    // GET USERS
    getAllUsers: build.query<User[], void>({
      query: () => "api/user/getAllUsers",
      providesTags: ["Users"],
    }),

    // GET TEAMS
    getTeams: build.query<AdminDetailsTeam[], void>({
      query: () => "api/team/getTeams",
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetTasksQuery,
  useCreateProjectMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useSearchTaskMutation,
  useGetAllUsersQuery,
  useGetTeamsQuery,
  useGetAllTasksQuery,
  useGetUserTasksQuery,
} = api;
