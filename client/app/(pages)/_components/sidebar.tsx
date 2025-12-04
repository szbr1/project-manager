"use client";
import { setToggleSwitch } from "@/store/global-states";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import {
  SidebarLink,
  SidebarPriority,
} from "../../../constants/sidebar-details";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import { useGetProjectsQuery } from "@/store/services/api";
import { FaBagShopping } from "react-icons/fa6";

function Sidebar() {
  const [isProjectsOpen, setProjectsOpen] = useState(false);
  const [isPriorityOpen, setPriorityOpen] = useState(false);
  const pathname = usePathname();

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isToggleMenu = useAppSelector((state) => state.global.isToggleMenu);

  return (
    <aside
      className={`
      bg-white dark:bg-zinc-900 text-black dark:text-white
      absolute md:static top-0 left-0 z-30
      transition-transform duration-300 md:translate-x-0 
       ${isToggleMenu ? "translate-x-0" : "-translate-x-full"} 
      flex flex-col 
      h-screen md:w-[30vw] lg:w-[23vw] w-4/5 
      border-r  dark:border-zinc-700 border-gray-300
    `}
    >
      <div className="w-full  py-3 flex gap-2  border-b border-gray-300 dark:border-gray-700 justify-between items-center">
        {/* LOGO  */}
        <Link href={"/"} className="flex justify-start items-center gap-1">
          <Image src={"/taskflow.png"} height={50} width={50} alt="logo" />
          <p>TaskFlow</p>
        </Link>

        {/* CLOSE SIDEBAR BUTTON  */}
        <button
          onClick={() => {
            dispatch(setToggleSwitch());
          }}
          className="flex justify-center gap-1  md:hidden text-gray-600 dark:text-gray-300  cursor-pointer items-end"
        >
          <RxCross2 size={22} className="cursor-pointer mx-3 dark:text-white" />
        </button>
      </div>
      <div className="h-full w-full pb-8 py-5 overflow-y-auto sidebar">
        {/*  SIDEBAR LINKS  */}
        <div className="  flex flex-col ">
          {SidebarLink.map((a, index) => {
            const isActive = pathname === a.link;

            return (
              <Link
                href={a.link}
                onClick={() => {
                  dispatch(setToggleSwitch());
                }}
                key={index++}
                className={`flex justify-start items-end gap-2 px-4 py-[9px] w-full dark:text-white ${
                  isActive
                    ? "bg-gray-100 border-l-3 border-green-300 text-orange-500 dark:bg-zinc-700"
                    : null
                }`}
              >
                <a.icon size={20} />
                <p>{a.name}</p>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col justify-center gap-3 py-3">
          {/* PROJECTS */}
          <div>
            <div
              onClick={() => setProjectsOpen(!isProjectsOpen)}
              className="text-gray-500 dark:text-gray-500 text-xs px-4 flex justify-between items-center"
            >
              <p>Projects</p>
              {isProjectsOpen ? (
                <IoChevronUpOutline size={18} />
              ) : (
                <IoChevronDownOutline size={18} />
              )}
            </div>
            <div className="  flex flex-col ">
              {isProjectsOpen &&
                projects?.map((a, index) => {
                  const isActive = pathname === `/projects/${a.id}`;
                  return (
                    <Link
                      href={`/projects/${a.id}`}
                      onClick={() => {
                        dispatch(setToggleSwitch());
                      }}
                      key={index++}
                      className={`flex justify-start items-end gap-2 px-4 py-[9px] w-full dark:text-white ${
                        isActive
                          ? "bg-gray-100 border-l-3 border-green-300 text-orange-500 dark:bg-zinc-700"
                          : null
                      }`}
                    >
                      <FaBagShopping size={20} />
                      <p>{a.name}</p>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/*  PRIORITY  */}
          <div>
            <div
              onClick={() => {
             
                setPriorityOpen(!isPriorityOpen);
              }}
              className="text-gray-500 dark:text-gray-500 text-xs px-4 flex justify-between items-center"
            >
              <p>Priority</p>
              {isPriorityOpen ? (
                <IoChevronUpOutline size={18} />
              ) : (
                <IoChevronDownOutline size={18} />
              )}
            </div>
            <div className="  flex flex-col ">
              {isPriorityOpen &&
                SidebarPriority.map((a, index) => {
                  const isActive = pathname === a.link;

                  return (
                    <Link
                      href={a.link}
                      onClick={() => {
                        dispatch(setToggleSwitch());
                      }}
                      key={index++}
                      className={`flex justify-start items-end gap-2 px-4 py-[9px] w-full dark:text-white ${
                        isActive
                          ? "bg-gray-100 border-l-3 border-green-300 text-orange-500 dark:bg-zinc-700"
                          : null
                      }`}
                    >
                      <a.icon size={20} />
                      <p>{a.name}</p>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
