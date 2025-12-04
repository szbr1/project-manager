import type { Response, Request } from "express";
import prisma from "../lib/db";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany();
    const TeamWithUsername = await Promise.all(
      teams.map(async (team:any) => {
        if (!team) return;
        const teamProductOwner = await prisma.user.findUnique({
          where: {
            userId: team.productOwnerUserId,
          },
          select: {
            username: true,
          },
        });
        const teamProductManager = await prisma.user.findUnique({
            where: {userId: team.projectManagerUserId},
            select: {username: true}
        })

        return {...team, teamProductManager, teamProductOwner}
      }),
    )
    return res.status(200).json(TeamWithUsername);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to update task" });
  }
};
