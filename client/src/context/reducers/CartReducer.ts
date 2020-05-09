import { IAction } from "../../types/interfaces";
import {
  CART_LOADING,
  CART_GET_FAIL,
  CART_GET_SUCCESS,
  CART_ADD_FAIL,
  CART_ADD_SUCCESS,
  CART_REMOVE_FAIL,
  CART_REMOVE_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  items: null,
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_GET_SUCCESS:
    case CART_ADD_SUCCESS:
    case CART_REMOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data.cart,
      };
    case CART_GET_FAIL:
    case CART_ADD_FAIL:
    case CART_REMOVE_FAIL:
    default:
      return state;
  }
};
