import { IAction } from "../../types/interfaces";
import {
  CART_LOADING,
  CART_GET_FAIL,
  CART_GET_SUCCESS,
  CART_ADD_FAIL,
  CART_ADD_SUCCESS,
  CART_REMOVE_FAIL,
  CART_REMOVE_SUCCESS,
  CART_BUY_FAIL,
  CART_BUY_SUCCESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_SUCCESS,
  CART_CLEAR,
} from "../types";

const initialState = {
  isLoading: false,
  items: [],
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_UPDATE_SUCCESS:
    case CART_BUY_FAIL:
    case CART_GET_SUCCESS:
    case CART_ADD_SUCCESS:
    case CART_REMOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data.cart,
      };
    case CART_CLEAR:
    case CART_BUY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [],
      };
    case CART_UPDATE_FAIL:
    case CART_GET_FAIL:
    case CART_ADD_FAIL:
    case CART_REMOVE_FAIL:
    default:
      return state;
  }
};
