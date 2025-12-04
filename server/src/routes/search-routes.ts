import type { Router } from "express";
import express from "express";
import { searchTask } from "../controllers/search-controller";


const route:Router = express.Router();


route.post("/searchTask", searchTask);


export default route; 