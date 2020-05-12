import axios from "axios";
import { returnErrors } from "./ErrorActions";
import { IAuthFunction } from "../../types/interfaces";
//Constant
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

// Load User and get access token
export const loadUser = () => async (dispatch: Function) => {
  //Loading
  dispatch({ type: USER_LOADING });

  //Loaded ///api/auth/refresh_token
  const response = await fetch("/api/auth/refresh_token", {
    method: "POST",
    credentials: "include", // Cookie,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.success) {
    // User loaded then update access token and auth turn to true
    return dispatch({ type: USER_LOADED, payload: result });
  } else {
    // fail token to null auth turn to false
    dispatch(returnErrors(result.error, 500));
    return dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ name, email, password }: IAuthFunction) => (
  dispatch: Function
) => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const newUser = JSON.stringify({ name, email, password });

  axios
    .post("/api/auth/register", newUser, config)
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login User
export const login = ({ email, password }: IAuthFunction) => async (
  dispatch: Function
) => {
  const body = JSON.stringify({ email, password });

  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include", // Cookie
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const result = await response.json();

  if (result.success) {
    dispatch({ type: LOGIN_SUCCESS, payload: result });
  } else {
    dispatch(returnErrors(result.error, 500));
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout User
export const logout = () => async (dispatch: Function) => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include", // Cookie
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (result.success) {
    dispatch({ type: LOGOUT_SUCCESS });
  } else {
    dispatch(returnErrors(result.error, 500));
  }
};
