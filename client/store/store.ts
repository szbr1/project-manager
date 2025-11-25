import { configureStore } from "@reduxjs/toolkit";
import { api as globalReducer } from "./services/api";
import GlobalStates from "./global-states";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"], // only persist the 'global' slice
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

export const persistor = persistStore(makeStore());