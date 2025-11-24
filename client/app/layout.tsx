import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow — Project & Task Management",
  description:
    "A modern project management platform built with Next.js and TypeScript. Create projects, assign tasks, track progress.",
  keywords: [
    "Project Management",
    "Task Manager",
    "Next.js",
    "TypeScript",
    "Dashboard",
    "Productivity",
  ],
  authors: [{ name: "Shahzaib Mirza" }],
  creator: "Shahzaib Mirza",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
