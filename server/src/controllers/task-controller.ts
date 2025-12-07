import type { Request, Response } from "express";
import prisma from "../lib/db";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.query.projectId);

    const data = await prisma.task.findMany({
      where: { projectId },
      include: {
        assignee: true,
        attachments: true,
        author: true,
        comments: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to fetch tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      assignedUserId,
      authorUserId,
      description,
      startDate,
      dueDate,
      priority,
      status,
      projectId,
      points,
      tags,
    } = req.body;

    const data = await prisma.task.create({
      data: {
        title,
        assignedUserId,
        authorUserId,
        description,
        startDate,
        dueDate,
        priority,
        status,
        projectId,
        points,
        tags,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unbale to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;

    const data = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        status,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to update task" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const data = await prisma.task.findMany({
      select: { id: true, status: true, priority: true },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable To Fetch Tasks" });
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: { author: true, assignee: true },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable To Fetch User Tasks" });
  }
};
