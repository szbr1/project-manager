import type { Request, Response } from "express";
import prisma from "../lib/db";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const data = await prisma.project.findMany();
    return res
      .status(200)
      .json({ message: "projects fetched successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to fetch projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, endDate, startDate } = req.body;
    const data = await prisma.project.create({
      data: {
        name,
        description,
        endDate,
        startDate,
      },
    });
    console.log("successfully created");
    return res.status(200).json({ message: "project created successfully.", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to crate project" });
  }
};
