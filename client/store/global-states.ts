import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  isDarkMode: boolean; 
  isToggleMenu: boolean; 
}

const initialState: DarkModeState = {
  isDarkMode: false,
  isToggleMenu: false
};

export const slice = createSlice({
   name: "global-states",
   initialState,
   reducers: {
     setDarkMode: (state) => {
        state.isDarkMode = !state.isDarkMode
     },
     setToggleSwitch: (state) => {
      state.isToggleMenu = !state.isToggleMenu
     }
   }
})


export const {setDarkMode, setToggleSwitch} = slice.actions;
export default slice.reducer;