import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  isDarkMode: boolean; // dark mode ON/OFF
}

const initialState: DarkModeState = {
  isDarkMode: false,
};

export const slice = createSlice({
   name: "darkMode",
   initialState,
   reducers: {
     setDarkMode: (state) => {
        state.isDarkMode = !state.isDarkMode
     }
   }
})


export const {setDarkMode} = slice.actions;
export default slice.reducer;