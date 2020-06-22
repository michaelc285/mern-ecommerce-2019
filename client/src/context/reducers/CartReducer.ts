import { IAction } from "../../types/interfaces";
import {
  CART_LOADING,
  CART_GET_FAIL,
  CART_GET_SUCCESS,
  CART_ADD_FAIL,
  CART_ADD_SUCCESS,
  CART_REMOVE_FAIL,
  CART_REMOVE_SUCCESS,
  BUY_PROCESS_FAIL,
  BUY_PROCESS_SUCCESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_SUCCESS,
  CART_CLEAN,
  BUY_PROCESS_LOADING,
  BUY_PROCESS_CLEAN,
} from "../types";

export const cartReducer = (
  state = {
    isLoading: false,
    items: [],
  },
  action: IAction
) => {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case CART_UPDATE_SUCCESS:
    case CART_GET_SUCCESS:
    case CART_ADD_SUCCESS:
    case CART_REMOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data.cart,
      };
    case CART_CLEAN:
    case CART_UPDATE_FAIL:
    case CART_GET_FAIL:
    case CART_ADD_FAIL:
    case CART_REMOVE_FAIL:
      return {
        ...state,
        isLoading: false,
        items: [],
      };
    default:
      return state;
  }
};

export const buyProcessReducer = (
  state = { isLoading: false, success: false },
  action: IAction
) => {
  switch (action.type) {
    case BUY_PROCESS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case BUY_PROCESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case BUY_PROCESS_CLEAN:
    case BUY_PROCESS_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
      };
    default:
      return state;
  }
};
