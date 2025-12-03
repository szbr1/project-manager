// SIDEBAR LINKS IMPORTS
import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import { BsGear } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

// SIDEBAR PRIORITY IMPORTS
import { CiCircleAlert } from "react-icons/ci";
import { HiOutlineShieldExclamation } from "react-icons/hi2";
import { GoAlert } from "react-icons/go";
import { FiAlertOctagon } from "react-icons/fi";
import { LuLayers } from "react-icons/lu";

export const SidebarLink = [
  {
    name: "Home",
    link: "/",
    icon: HiOutlineHome,
  },
  {
    name: "Timeline",
    link: "/timeline",
    icon: HiOutlineBriefcase,
  },
  {
    name: "Search",
    link: "/search",
    icon: GoSearch,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: BsGear,
  },
  {
    name: "Users",
    link: "/users",
    icon: HiOutlineUser,
  },
  {
    name: "Teams",
    link: "/teams",
    icon: HiOutlineUsers,
  },
] as const;

export const SidebarPriority = [
  {
    name: "Urgent",
    link: "/priority/urgent",
    icon: CiCircleAlert,
  },
  {
    name: "High",
    link: "/priority/high",
    icon: HiOutlineShieldExclamation,
  },
  {
    name: "Medium",
    link: "/priority/medium",
    icon: GoAlert,
  },
  {
    name: "low",
    link: "/priority/low",
    icon: FiAlertOctagon,
  },
  {
    name: "Backlog",
    link: "/priority/backlog",
    icon: LuLayers,
  },
];
