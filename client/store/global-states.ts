import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  isDarkMode: boolean;
  isToggleMenu: boolean;
  createTask: {
    title: string;
    startDate: string;
    dueDate: string;
    description: string;
  };
}

const initialState: DarkModeState = {
  isDarkMode: false,
  isToggleMenu: false,
  createTask: {
    title: "",
    startDate: "",

    dueDate: "",
    description: "",
  },
};

export const slice = createSlice({
  name: "global-states",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setToggleSwitch: (state) => {
      state.isToggleMenu = !state.isToggleMenu;
    },
    setCreateTask: (state, action) => {
      state.createTask = action.payload;
    },
  },
});

export const { setDarkMode, setToggleSwitch, setCreateTask } = slice.actions;
export default slice.reducer;
