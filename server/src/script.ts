import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
// ROUTES IMPORTS
import Project from "./routes/project-routes";
import Task from "./routes/task-routes";
import Search from "./routes/search-routes";
import User from "./routes/user-routes";
import Team from "./routes/team-routes";

// CONFIGURATIONS
config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({ origin: process.env.NEXT_CLIENT_URL }));

// ROUTES ;

app.use("/api/project", Project);
app.use("/api/task", Task);
app.use("/api/search", Search);
app.use("/api/user", User);
app.use("/api/team", Team);

// SERVER SETUP
const port = Number(process.env.PORT) || 8000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
