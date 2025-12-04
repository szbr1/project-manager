import type {Request, Response} from "express"
import prisma from "../lib/db";


export const getAllUsers = async (req: Request, res: Response) => {
  try {

    const data = await prisma.user.findMany({});
    return res
      .status(200)
      .json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to fetch users" });
  }
};