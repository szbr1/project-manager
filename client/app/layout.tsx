import type { Metadata } from "next";
import "./global.css";

import { FixProvider } from "@/store/Provider";
import Navbar from "./(pages)/_components/Navbar/navbar";
import Sidebar from "./(pages)/_components/Sidebar/sidebar";
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
      <body className="flex dark:bg-zinc-900 dark:text-white overflow-hidden">
        <FixProvider>
          <Sidebar />
          <Navbar />
          <div className="h-full w-full mt-12">{children}</div>
        </FixProvider>
      </body>
    </html>
  );
}
