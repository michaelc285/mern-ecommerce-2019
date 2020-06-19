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
  AUTH_ERRORS_CLEAN,
  USER_PROFILE_LOAD_FAIL,
  USER_PROFILE_LOAD_SUCCESS,
  USER_PROFILE_UPDATE,
  USER_DELETE_ACCOUNT_SUCCESS,
  UPDATE_CONTACT_LOADING,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_CLEAN,
  USER_CONTACT_UPDATE,
} from "../types";

export const authReducer = (
  state: any = {
    token: "",
    isAuthenticated: false,
    isLoading: false,
    user: null,
    errors: [],
  },
  action: any
) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.data.accesstoken,
        user: action.payload.data.data,
        isAuthenticated: true,
        isLoading: false,
        errors: [],
      };
    case LOGIN_SUCCESS:
    case USER_LOADED:
      return {
        ...state,
        token: action.payload.accesstoken,
        user: action.payload.data,
        isAuthenticated: true,
        isLoading: false,
        errors: [],
      };
    case USER_CONTACT_UPDATE:
    case USER_PROFILE_UPDATE:
    case USER_PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload.data.data,
        isLoading: false,
        errors: [],
      };
    case USER_PROFILE_LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: [...action.payload.errors],
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        isLoading: false,
        user: null,
        errors: [...action.payload.errors],
      };
    case AUTH_ERRORS_CLEAN:
      return {
        ...state,
        errors: [],
      };
    case USER_DELETE_ACCOUNT_SUCCESS:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        isLoading: false,
        user: null,
        errors: [],
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

export const userUpdate = (
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

export const contactDetailsUpdate = (
  state: any = { isLoading: false, success: false, errors: [] },
  action: any
) => {
  switch (action.type) {
    case UPDATE_CONTACT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
        errors: [],
      };
    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        success: false,
        isLoading: false,
        errors: [...action.payload.data.errors],
      };
    case UPDATE_CONTACT_CLEAN:
      return {
        isLoading: false,
        success: false,
        errors: [],
      };
    default:
      return state;
  }
};
