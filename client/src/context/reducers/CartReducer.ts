import { IAction } from "../../types/interfaces";
import { CART_LOADING, CART_GET_FAIL, CART_GET_SUCCESS } from "../types";

const initialState = {
  isLoading: false,
  cart: [],
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.payload.data,
      };
    case CART_GET_FAIL:
    default:
      return state;
  }
};
