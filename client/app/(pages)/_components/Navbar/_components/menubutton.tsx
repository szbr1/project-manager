"use client";
import { setToggleSwitch } from "@/store/global-states";
import { useAppDispatch } from "@/store/store";
import { IoMenu } from "react-icons/io5";

function Menu() {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setToggleSwitch());
      }}
    >
      <IoMenu className="dark:text-white cursor-pointer" size={24} />
    </button>
  );
}

export default Menu;
