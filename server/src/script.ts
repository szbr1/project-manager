import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from 'morgan';
// ROUTES IMPORTS 
import Project from "./routes/project-routes"
import Task from "./routes/task-routes"
import helmet from "helmet";


// CONFIGURATIONS 
config(); 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(cors({ origin: process.env.NEXT_CLIENT_URL }));

// ROUTES ;

app.use("/api/project", Project)
app.use("/api/task", Task)

// SERVER SETUP 
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
