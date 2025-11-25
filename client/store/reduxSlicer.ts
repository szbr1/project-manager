import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  isSelected: boolean; // dark mode ON/OFF
}

const initialState: DarkModeState = {
  isSelected: false,
};

export const slice = createSlice({
   name: "darkMode",
   initialState,
   reducers: {
     setDarkMode: (state) => {
        state.isSelected = !state.isSelected
     }
   }
})


export const {setDarkMode} = slice.actions;
export default slice.reducer;