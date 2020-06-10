import axios from "axios";
import { returnErrors } from "./ErrorActions";
import { IAuthFunction } from "../../types/interfaces";
import { loadCart } from "./CartAction";
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
  GET_USERS_LIST_FAIL,
  GET_USERS_LIST_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_LOADING,
  UPDATE_USERS_FAIL,
  UPDATE_USERS_SUCCESS,
  UPDATE_USER_LOADING,
  DELETE_USER_CLEAR,
  USER_DETAILS_LOADING,
  USER_LIST_LOADING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
} from "../types";

// Load User and get access token
export const loadUser = () => async (dispatch: Function) => {
  //Loading
  dispatch({ type: USER_LOADING });
  try {
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
      dispatch(loadCart());
    } else {
      // fail token to null auth turn to false
      dispatch(returnErrors(result.error, 500));
      dispatch({ type: AUTH_ERROR });
    }
  } catch (err) {
    console.log(err);
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
    dispatch(loadCart());
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
  } else {
    dispatch(returnErrors(result.error, 500));
  }
};

// Get Users
export const getUsers = () => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: USER_LIST_LOADING });

    const result = await axios.get(`/api/users?type=all`, {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: GET_USERS_LIST_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: GET_USERS_LIST_FAIL });
  }
};

// Get Users By ID
export const getUserById = (userId: string) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: USER_DETAILS_LOADING });

    const result = await axios.get(`/api/users?id=${userId}&type=single`, {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: GET_USER_DETAILS_FAIL });
  }
};

// Delete User by Admin
export const deleteUser = (userId: string) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: DELETE_USER_LOADING });

    await axios.delete(`/api/users?id=${userId}`, {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: DELETE_USER_FAIL });
  }
};

// Clear delete user reducer state
export const clearDeleteUserState = () => (dispatch: Function) =>
  dispatch({ type: DELETE_USER_CLEAR });

// Update user by admin
export const userUpdateByAdmin = (userId: string, content: object) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: UPDATE_USER_LOADING });

    await axios.put(`/api/users?id=${userId}`, content, {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: UPDATE_USERS_SUCCESS });
  } catch (err) {
    dispatch({ type: UPDATE_USERS_FAIL });
  }
};
