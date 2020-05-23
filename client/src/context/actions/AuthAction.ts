import axios from "axios";
import { returnErrors, clearErrors } from "./ErrorActions";
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
  CART_CLEAR,
  HISTORY_CLEAR,
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
    dispatch({ type: USER_LOADED, payload: result });
  } else {
    // fail token to null auth turn to false
    dispatch(returnErrors(result.error, 500));
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User, reutrn boolean
export const register = ({ name, email, password }: IAuthFunction) => async (
  dispatch: Function
) => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const newUser = JSON.stringify({ name, email, password });

    const result = await axios.post("/api/auth/register", newUser, config);

    dispatch({ type: REGISTER_SUCCESS, payload: result.data });

    return true;
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, REGISTER_FAIL, [
        REGISTER_FAIL,
      ])
    );
    dispatch({ type: REGISTER_FAIL });
    return false;
  }
};

// Login User , return boolean
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
    dispatch(
      returnErrors(result.error, result.status, LOGIN_FAIL, result.labels)
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout User, return boolean
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
    dispatch({ type: HISTORY_CLEAR });
    dispatch({ type: CART_CLEAR });
    return true;
  } else {
    dispatch(returnErrors(result.error, 500));
    return false;
  }
};
