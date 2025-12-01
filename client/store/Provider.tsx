"use client";
import { Provider } from "react-redux";
import React from "react";
import { makeStore } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const store = makeStore();
const persistor = persistStore(store);

export const FixProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </DndProvider>
  </Provider>
);
