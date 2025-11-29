import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from 'morgan';
import helmet from "helmet";
// ROUTES IMPORTS 



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



// SERVER SETUP 
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
