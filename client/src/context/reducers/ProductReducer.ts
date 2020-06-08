import { IAction } from "../../types/interfaces";
import {
  PRODUCT_LIST_GET_FAIL,
  PRODUCT_LIST_GET_SUCCESS,
  PRODUCT_LIST_CREATE_FAIL,
  PRODUCT_LIST_CREATE_SUCCESS,
  PRODUCT_LIST_LOADED,
  PRODUCT_LIST_LOADING,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_GET_SUCCESS,
  PRODUCT_DETAILS_GET_FAIL,
  PRODUCT_EDIT_DELETE_FAIL,
  PRODUCT_EDIT_DELETE_SUCCESS,
  PRODUCT_EDIT_LOADING,
} from "../types";

export const productListReducer = (
  state: any = {
    isLoading: false,
    data: [],
  },
  action: IAction
) => {
  switch (action.type) {
    case PRODUCT_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        data: [],
      };
    case PRODUCT_LIST_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [],
      };
    case PRODUCT_LIST_GET_SUCCESS:
      return {
        isLoading: false,
        data: [...action.payload.data.products],
      };
    case PRODUCT_LIST_LOADED:
    case PRODUCT_LIST_CREATE_FAIL:
    case PRODUCT_LIST_GET_FAIL:
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state: any = {
    isLoading: false,
    data: {},
  },
  action: IAction
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_DETAILS_GET_SUCCESS:
      console.log(action.payload.data.products);
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.products,
      };
    case PRODUCT_DETAILS_GET_FAIL:
    default:
      return state;
  }
};

export const productEditReducer = (
  state: any = { isLoading: false },
  action: IAction
) => {
  switch (action.type) {
    case PRODUCT_EDIT_LOADING:
      return { ...state, isLoading: true };
    case PRODUCT_EDIT_DELETE_SUCCESS:
      return { ...state, isLoading: false };
    case PRODUCT_EDIT_DELETE_FAIL:
    default:
      return state;
  }
};
