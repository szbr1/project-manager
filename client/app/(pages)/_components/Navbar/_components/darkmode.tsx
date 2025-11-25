"use client";
import { setDarkMode } from "@/store/reduxSlicer";
import React, { useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function DarkModeComponent() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

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

    dispatch(setDarkMode(!isDarkMode));
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
