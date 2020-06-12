import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
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
} from "../types";

export const authReducer = (
  state: any = {
    token: "",
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
  action: any
) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // localStorage.setItem("token", action.payload.accesstoken);
      return {
        ...state,
        token: action.payload.accesstoken,
        user: action.payload.data,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      // localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};

export const usersListReducer = (
  state: any = { isLoading: false, data: [] },
  action: any
) => {
  switch (action.type) {
    case USER_LIST_LOADING:
      return { ...state, isLoading: true };
    case GET_USERS_LIST_SUCCESS:
      return { ...state, isLoading: false, data: action.payload.data.users };
    case GET_USERS_LIST_FAIL:
    default:
      return state;
  }
};
export const userDetailsReducer = (
  state: any = { isLoading: false, data: {} },
  action: any
) => {
  switch (action.type) {
    case USER_DETAILS_LOADING:
      return { ...state, isLoading: true };
    case GET_USER_DETAILS_SUCCESS:
      return { ...state, isLoading: false, data: action.payload.data.user };
    case GET_USER_DETAILS_FAIL:
    case GET_USER_DETAILS_CLEAN:
      return {
        ...state,
        isLoading: false,
        data: {},
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state: any = { isLoading: false, success: false },
  action: any
) => {
  switch (action.type) {
    case DELETE_USER_LOADING:
      return { ...state, isLoading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case DELETE_USER_CLEAN:
    case DELETE_USER_FAIL:
      return { ...state, isLoading: false, success: false };
    default:
      return state;
  }
};

export const userUpdateByAdminReducer = (
  state: any = { isLoading: false, success: false, errors: [] },
  action: any
) => {
  switch (action.type) {
    case UPDATE_USER_LOADING:
      return { ...state, isLoading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, success: true, errors: [] };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        errors: [...action.payload.data.errors],
      };
    case UPDATE_USER_CLEAN:
      return {
        ...state,
        isLoading: false,
        success: false,
        errors: [],
      };
    default:
      return state;
  }
};

export const userCreateByAdminReducer = (
  state: any = { isLoading: false, success: false, errors: [] },
  action: any
) => {
  switch (action.type) {
    case CREATE_USER_LOADING:
      return { ...state, isLoading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, isLoading: false, success: true, errors: [] };
    case CREATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        errors: [...action.payload.data.errors],
      };
    case CREATE_USER_CLEAN:
      return {
        ...state,
        isLoading: false,
        success: false,
        errors: [],
      };
    default:
      return state;
  }
};
