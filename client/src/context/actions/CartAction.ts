import { returnErrors } from "./ErrorActions";
import {
  CART_LOADING,
  CART_GET_FAIL,
  CART_GET_SUCCESS,
  CART_ADD_FAIL,
  CART_ADD_SUCCESS,
} from "../types";
import axios from "axios";

// Load cart
export const loadCart = () => async (dispatch: Function) => {
  // Loading
  dispatch({ type: CART_LOADING });
  try {
    //await axios.post("/api/user/product/");

    dispatch({ type: CART_GET_SUCCESS, payload: null });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: CART_GET_FAIL });
  }
};

// add thing to cart
export const addProductToCart = () => async (dispatch: Function) => {
  //Loading

  try {
    dispatch({ type: CART_LOADING });

    dispatch({ type: CART_ADD_SUCCESS, payload: null });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: CART_GET_FAIL });
  }
};

// Remove thing from cart
//Checkout / payment
