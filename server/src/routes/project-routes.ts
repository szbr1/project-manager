import { getProjects, createProject } from './../controllers/project-controller';
import type { Router } from "express";
import express from "express";


const route:Router = express.Router();


route.get("/getProjects", getProjects);
route.post("/createProject", createProject);


export default route; 