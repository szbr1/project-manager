"use client"
import {Provider} from "react-redux"
import React from "react"
import { makeStore } from "./store";

const store = makeStore()

export const FixProvider = ({children}: {children: React.ReactNode}) => (
  <Provider store={store}>
    {children}
  </Provider>
);
