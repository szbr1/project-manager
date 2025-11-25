"use client"
import { setDarkMode, setToggleSwitch } from "@/store/global-states";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function Menu() {

    const dispatch = useDispatch();
    const isToggleMenu = useSelector(state => state.condition.istoggleMenu)
  return (
    <button onClick={()=>{
        dispatch(setToggleSwitch(!isToggleMenu))
    }}>
      <IoMenu className="dark:text-white cursor-pointer" size={24} />
    </button>
  );
}

export default Menu;
