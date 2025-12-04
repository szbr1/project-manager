import type { Router } from "express";
import express from "express";
import { getTeams } from "../controllers/team-controller";


const route:Router = express.Router();

route.get("/getTeams", getTeams)



export default route; 