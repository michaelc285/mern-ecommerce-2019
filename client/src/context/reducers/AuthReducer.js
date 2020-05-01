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

const initialState = {
  token: "",
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        token: action.payload.accesstoken,
        isAuthenticated: true,
        isLoading: false,
        user: state.user,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //localStorage.setItem("accesstoken", action.payload.accesstoken);
      return {
        ...state,
        token: action.payload.accesstoken,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.data,
        error: null,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      //localStorage.removeItem("accesstoken");
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
