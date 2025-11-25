import { makeStore } from './store';
import { configureStore } from "@reduxjs/toolkit";
import { api as globalReducer } from "./services/api";
import GlobalStates from "./global-states";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { useDispatch, useSelector } from 'react-redux';


const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();


// Persist config
const persistConfig = {
  key: "global",
  storage,
  whitelist: ["isDarkMode"], // only persist the 'global' slice
};

// Wrap your GlobalStates reducer with persistReducer
const persistedGlobalStates = persistReducer(persistConfig, GlobalStates);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [globalReducer.reducerPath]: globalReducer.reducer,
      global: persistedGlobalStates, // use persisted version
    },
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).concat(globalReducer.middleware),
  });

  return store;
};


// Type saftey
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();