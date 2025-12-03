import { Button } from "@/components/ui/button";
import React from "react";

interface HeaderProps {
  title: string;
  size?: "sm" | "md" | "lg";
  button?: string;
  subheading?: string;
  setIsNewProjectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Header({
  size,
  title,
  button,
  subheading,
  setIsNewProjectOpen,
}: HeaderProps) {
  return (
    <div className="w-full py-5 flex justify-between items-start lg:px-5 px-2 md:px-3 bg-light-green dark:bg-zinc-800">
      <div>
        <p
          className={`${size === "sm" && "text-xl"} ${
            size === "lg" && "text-4xl"
          } ${size === "md" && "text-2xl"} font-bold lg:text-2xl md:text-xl  `}
        >
          {title}
        </p>
        <p className="text-gray-400 dark:text-zinc-400 text-xs">{subheading}</p>
      </div>
      {button && (
        <Button
          onClick={() => setIsNewProjectOpen(true)}
          className="bg-black hover:border dark:hover:bg-zinc-500 cursor-pointer  text-white dark:bg-zinc-700"
        >
          {button}
        </Button>
      )}
    </div>
  );
}

export default Header;
