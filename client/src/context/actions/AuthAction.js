import axios from "axios";
import { returnErrors } from "./ErrorActions";

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

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Load User
export const loadUser = () => (dispatch, getState) => {
  //Loading
  dispatch({ type: USER_LOADING });

  //Loaded
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
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
export const login = ({ email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const user = JSON.stringify({ email, password });

  axios
    .post("/api/auth/login", user, config)
    .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout User
export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};
