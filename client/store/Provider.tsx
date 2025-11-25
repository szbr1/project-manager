"use client"
import { Provider } from "react-redux";
import React from "react";
import { makeStore, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const store = makeStore();

export const FixProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);