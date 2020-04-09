import React, { createContext, useReducer } from "react";
import AuthReducer from "../reducers/AuthReducer";
import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../types";

//Initial State
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  error: null,
};

const tokenConfig = (state) => {
  //Get token from localStorage
  const token = state.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token exists, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User & Check token
  const loadUser = async () => {
    try {
      // User Loading
      dispatch({ type: USER_LOADING });

      const res = await axios.get("/api/auth/user", tokenConfig(state));

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.message,
      });
    }
  };

  // Login
  const login = async (user) => {
    // Header
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth/login", user, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log(res.data.token);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: LOGOUT_SUCCESS });
  };

  // Register user
  const register = async (newUser) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth/register", newUser, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        login,
        loadUser,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
