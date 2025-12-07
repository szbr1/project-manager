import { getTasks, createTask,updateTask, getAllTasks } from './../controllers/task-controller';
import type { Router } from "express";
import express from "express";


const route:Router = express.Router();


route.get("/getTasks", getTasks);
route.post("/createTask", createTask);
route.patch("/:taskId/updateTask", updateTask)
route.get("/getAllTasks", getAllTasks)


export default route; 