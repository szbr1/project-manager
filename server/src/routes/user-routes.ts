import type { Router } from "express";
import express from "express";
import { getAllUsers } from "../controllers/user-controller";


const route:Router = express.Router();

route.get("/getAllUsers", getAllUsers)



export default route; 