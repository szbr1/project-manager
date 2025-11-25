"use client"
import { setToggleSwitch } from "@/store/global-states";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";
import { IoMenu } from "react-icons/io5";

function Menu() {

    const dispatch = useAppDispatch();
    const isToggleMenu = useAppSelector(state => state.global.isToggleMenu)
  return (
    <button onClick={()=>{
        dispatch(setToggleSwitch())
    }}>
      <IoMenu className="dark:text-white cursor-pointer" size={24} />
    </button>
  );
}

export default Menu;
