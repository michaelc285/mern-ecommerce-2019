import { returnErrors } from "./ErrorActions";
import {
  CART_LOADING,
  CART_GET_FAIL,
  CART_GET_SUCCESS,
  CART_ADD_FAIL,
  CART_ADD_SUCCESS,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,
} from "../types";
import axios from "axios";

// Load cart
export const loadCart = () => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    // Loading
    dispatch({ type: CART_LOADING });

    const result = await axios.get("/api/users/cart/", {
      headers: {
        authorization: `Bearer ${getState().auth.token}`,
      },
    });
    dispatch({ type: CART_GET_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: CART_GET_FAIL });
  }
};

// add product to cart
export const addProductToCart = (productId: string) => async (
  dispatch: Function,
  getState: Function
) => {
  //Loading

  try {
    dispatch({ type: CART_LOADING });

    const result = await axios.get(
      `/api/users/cart/add?productId=${productId}`,
      {
        headers: { authorization: `Bearer ${getState().auth.token}` },
      }
    );

    dispatch({ type: CART_ADD_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: CART_ADD_FAIL });
  }
};

// Remove product from cart
export const removeProductFromCart = (productId: string) => async (
  dispatch: Function,
  getState: Function
) => {
  //Loading

  try {
    dispatch({ type: CART_LOADING });

    const result = axios.get(`/api/user/cart/remove?productId=${productId}`, {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: CART_REMOVE_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: CART_REMOVE_FAIL });
  }
};
