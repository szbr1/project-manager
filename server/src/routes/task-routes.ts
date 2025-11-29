import { getTasks, createTask,updateTask } from './../controllers/task-controller';
import type { Router } from "express";
import express from "express";


const route:Router = express.Router();


route.get("/getTasks", getTasks);
route.post("/createTask", createTask);
route.patch("/:taskId/updateTask", updateTask)


export default route; 