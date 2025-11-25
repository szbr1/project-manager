import {configureStore } from "@reduxjs/toolkit";
import {api as globalReducer} from "./services/api";
import DarkMode from "./reduxSlicer"

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: {
      [globalReducer.reducerPath]: globalReducer.reducer,
      darkMode: DarkMode
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(globalReducer.middleware),
  })
};

