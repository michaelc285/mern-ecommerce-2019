import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial State
const initialState = {
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return <GlobalContext.Provider value={}>{children}</GlobalContext.Provider>;
};
