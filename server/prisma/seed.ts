import fs from "fs";
import path from "path";
import prisma from "../src/lib/db";


// Type definitions for JSON data
interface UserData {
  username: string;
  teamId: number;
  profilePictureUrl: string;
  cognitoId: string;
}

interface TeamData {
  teamName: string;
  productOwnerUserId: number;
  projectManagerUserId: number;
}

interface ProjectData {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface TaskData {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tags: string;
  startDate: string;
  dueDate: string;
  projectId: number;
  authorUserId: number;
  assignedUserId: number;
}

interface ProjectTeamData {
  id: number;
  teamId: number;
  projectId: number;
}

interface TaskAssignmentData {
  id: number;
  userId: number;
  taskId: number;
}

interface AttachmentData {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

interface CommentData {
  id: number;
  text: string;
  taskId: number;
  userId: number;
}

// Load JSON files from seedData folder - using process.cwd() to get correct path
const loadJSON = <T>(filename: string): T[] => {
  const filePath = path.join(process.cwd(), "prisma", "seedData", filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.comment.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.taskAssignment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.projectTeam.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();

  // Load data
  const teams = loadJSON<TeamData>("team.json");
  const users = loadJSON<UserData>("user.json");
  const projects = loadJSON<ProjectData>("project.json");
  const tasks = loadJSON<TaskData>("task.json");
  const projectTeams = loadJSON<ProjectTeamData>("projectTeam.json");
  const taskAssignments = loadJSON<TaskAssignmentData>("taskAssignment.json");
  const attachments = loadJSON<AttachmentData>("attachment.json");
  const comments = loadJSON<CommentData>("comment.json");

  // Seed Teams
  console.log("📊 Seeding teams...");
  for (const team of teams) {
    await prisma.team.create({
      data: {
        teamName: team.teamName,
        productOwnerUserId: team.productOwnerUserId,
        projectManagerUserId: team.projectManagerUserId,
      },
    });
  }

  // Seed Users
  console.log("👥 Seeding users...");
  for (const user of users) {
    await prisma.user.create({
      data: {
        username: user.username,
        cognitoId: user.cognitoId,
        profilePictureUrl: user.profilePictureUrl,
        teamId: user.teamId,
      },
    });
  }

  // Seed Projects
  console.log("📁 Seeding projects...");
  for (const project of projects) {
    await prisma.project.create({
      data: {
        id: project.id,
        name: project.name,
        description: project.description,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
      },
    });
  }

  // Seed Tasks
  console.log("✅ Seeding tasks...");
  for (const task of tasks) {
    await prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        tags: task.tags,
        startDate: new Date(task.startDate),
        dueDate: new Date(task.dueDate),
        projectId: task.projectId,
        authorUserId: task.authorUserId,
        assignedUserId: task.assignedUserId,
      },
    });
  }

  // Seed ProjectTeams
  console.log("🔗 Seeding project teams...");
  for (const pt of projectTeams) {
    await prisma.projectTeam.create({
      data: {
        id: pt.id,
        teamId: pt.teamId,
        projectId: pt.projectId,
      },
    });
  }

  // Seed TaskAssignments
  console.log("📌 Seeding task assignments...");
  for (const ta of taskAssignments) {
    await prisma.taskAssignment.create({
      data: {
        id: ta.id,
        userId: ta.userId,
        taskId: ta.taskId,
      },
    });
  }

  // Seed Attachments
  console.log("📎 Seeding attachments...");
  for (const attachment of attachments) {
    await prisma.attachment.create({
      data: {
        id: attachment.id,
        fileURL: attachment.fileURL,
        fileName: attachment.fileName,
        taskId: attachment.taskId,
        uploadedById: attachment.uploadedById,
      },
    });
  }

  // Seed Comments
  console.log("💬 Seeding comments...");
  for (const comment of comments) {
    await prisma.comment.create({
      data: {
        id: comment.id,
        text: comment.text,
        taskId: comment.taskId,
        userId: comment.userId,
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });