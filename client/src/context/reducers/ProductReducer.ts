import { IAction } from "../../types/interfaces";
import {
  PRODUCT_LOADING,
  PRODUCT_LOADED,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_ERROR,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
} from "../types";

const initialState = {
  isLoading: false,
  data: [],
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        data: [],
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [],
      };
    case PRODUCT_GET_SUCCESS:
      return {
        isLoading: false,
        data: [...action.payload.products],
      };
    case PRODUCT_LOADED:
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_CREATE_ERROR:
    case PRODUCT_GET_FAIL:
    default:
      return state;
  }
};
