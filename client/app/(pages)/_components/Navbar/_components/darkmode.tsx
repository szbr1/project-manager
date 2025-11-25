"use client";
import { setDarkMode } from "@/store/global-states";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect } from "react";
import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";

function DarkModeComponent() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(state => state.global.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    console.log("clicked");
    document.documentElement.classList.add("dark");

    dispatch(setDarkMode());
  };

  return (
    <button className="cursor-pointer" onClick={toggleTheme}>
      {isDarkMode ? (
        <IoMoonOutline className="dark:text-white" size={22} />
      ) : (
        <IoMoonSharp className="dark:text-white" size={22} />
      )}
    </button>
  );
}

export default DarkModeComponent;
