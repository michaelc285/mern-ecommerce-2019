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
  CART_CLEAN,
  HISTORY_CLEAR as HISTORY_CLEAN,
  GET_USERS_LIST_FAIL,
  GET_USERS_LIST_SUCCESS,
  GET_USER_DETAILS_CLEAN,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_LOADING,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_CLEAN,
  UPDATE_USER_LOADING,
  DELETE_USER_CLEAN,
  USER_DETAILS_LOADING,
  USER_LIST_LOADING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  CREATE_USER_CLEAN,
  CREATE_USER_FAIL,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  AUTH_ERRORS_CLEAN,
  USER_PROFILE_LOAD_FAIL,
  USER_PROFILE_LOAD_SUCCESS,
  USER_PROFILE_UPDATE,
  USER_DELETE_ACCOUNT_SUCCESS,
  UPDATE_CONTACT_CLEAN,
  USER_CONTACT_UPDATE,
  UPDATE_CONTACT_LOADING,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_ACCOUNT_STATUS_CLEAN,
  UPDATE_ACCOUNT_STATUS_FAIL,
  UPDATE_ACCOUNT_STATUS_LOADING,
  UPDATE_ACCOUNT_STATUS_SUCCESS,
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
      dispatch(returnErrors(result.error, response.status));
      dispatch({ type: AUTH_ERROR, payload: result });
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

    dispatch({ type: REGISTER_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

// Login User
export const login = ({ email, password }: IAuthFunction) => async (
  dispatch: Function
) => {
  dispatch({ type: USER_LOADING });

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
    dispatch(returnErrors(result.errors, response.status));
    dispatch({ type: LOGIN_FAIL, payload: result });
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
    dispatch({ type: HISTORY_CLEAN });
    dispatch({ type: CART_CLEAN });
  } else {
    dispatch(returnErrors(result.errors, response.status));
  }
};

export const cleanAuthErrorsState = () => (dispatch: Function) =>
  dispatch({ type: AUTH_ERRORS_CLEAN });

// ------------------------------------------

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
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: GET_USERS_LIST_FAIL });
  }
};

// Get Users by Filters
export const getUsersByFilter = (filter: object = {}) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: USER_LIST_LOADING });

    const result = await axios.post(`/api/users`, filter, {
      headers: {
        authorization: `Bearer ${getState().auth.token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: GET_USERS_LIST_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
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
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: GET_USER_DETAILS_FAIL });
  }
};

// Get Users by access token in state
export const getUserByAccessToken = () => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: USER_LOADING });

    const result = await axios.get("/api/users/profile", {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: USER_PROFILE_LOAD_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: USER_PROFILE_LOAD_FAIL, payload: err.response.data });
  }
};

// Clean User details reducer
export const cleanUserDetailsState = () => (dispatch: Function) =>
  dispatch({ type: GET_USER_DETAILS_CLEAN });
// --------------------------------------------------------------
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
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: DELETE_USER_FAIL });
  }
};

// Delete User by User
export const deleteAccountByUser = () => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: DELETE_USER_LOADING });

    await axios.delete("/api/users/profile", {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: DELETE_USER_SUCCESS });
    // Reset Auth state to inital
    dispatch({ type: USER_DELETE_ACCOUNT_SUCCESS });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: DELETE_USER_FAIL });
  }
};

// Clear delete user reducer state
export const cleanDeleteUserState = () => (dispatch: Function) =>
  dispatch({ type: DELETE_USER_CLEAN });
// --------------------------------------------------------------

// Update user by admin
export const userUpdateByAdmin = (userId: string, body: object) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: UPDATE_USER_LOADING });

    await axios.put(`/api/users?id=${userId}`, body, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().auth.token}`,
      },
    });

    dispatch({ type: UPDATE_USER_SUCCESS });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: UPDATE_USER_FAIL, payload: err.response });
  }
};

// Update user by user
export const userUpdateByUser = (body: object) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: UPDATE_USER_LOADING });

    const result = await axios.put("/api/users/profile", body, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().auth.token}`,
      },
    });

    dispatch({ type: UPDATE_USER_SUCCESS });
    dispatch({ type: USER_PROFILE_UPDATE, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: UPDATE_USER_FAIL, payload: err.response });
  }
};

// Clear update user reducer state
export const cleanUpdateUserState = () => (dispatch: Function) =>
  dispatch({ type: UPDATE_USER_CLEAN });
// --------------------------------------------------------------

// Create user by admin
export const createUserByAdmin = (body: object) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: CREATE_USER_LOADING });

    await axios.post("/api/users/create", body, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().auth.token}`,
      },
    });

    dispatch({ type: CREATE_USER_SUCCESS });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: CREATE_USER_FAIL, payload: err.response });
  }
};

// Clear create user reducer state
export const cleanCreateUserState = () => (dispatch: Function) =>
  dispatch({ type: CREATE_USER_CLEAN });
// --------------------------------------------------------------

// Update address by user
export const updateContactDetailsByUser = (body: object) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: UPDATE_CONTACT_LOADING });
    console.log(body);
    const result = await axios.put("/api/users/profile/contact", body, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().auth.token}`,
      },
    });

    dispatch({ type: UPDATE_CONTACT_SUCCESS });
    dispatch({ type: USER_CONTACT_UPDATE, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: UPDATE_USER_FAIL, payload: err.response });
  }
};

// Clear create user reducer state
export const cleanUpdateContactDetailsState = () => (dispatch: Function) =>
  dispatch({ type: UPDATE_CONTACT_CLEAN });

// --------------------------------------------------------------

// Update Account Status by Admin
export const updateAccountStatus = (
  accountId: string,
  status: boolean
) => async (dispatch: Function, getState: Function) => {
  try {
    dispatch({ type: UPDATE_ACCOUNT_STATUS_LOADING });

    await axios.put(
      `/api/users/status?id=${accountId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    dispatch({ type: UPDATE_ACCOUNT_STATUS_SUCCESS });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: UPDATE_ACCOUNT_STATUS_FAIL, payload: err.response });
  }
};

export const cleanUpdateAccountStatusState = () => (dispatch: Function) =>
  dispatch({ type: UPDATE_ACCOUNT_STATUS_CLEAN });

// --------------------------------------------------------------
