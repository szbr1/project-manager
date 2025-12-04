
import type { Response, Request } from "express";
import prisma from "../lib/db";


export const searchTask = async (req: Request, res: Response) => {
  try {
    const {searchTask} = req.body;
    const data = await prisma.task.findMany({
        where: {
            OR: [
                {title: {contains: searchTask, mode: "insensitive"} },
                {description: {contains: searchTask, mode: "insensitive"}}
            ]
        }
    })

    
    return res
      .status(200)
      .json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to update task" });
  }
};