import { returnErrors } from "./ErrorActions";
import {
  CART_LOADING,
  CART_GET_FAIL,
  CART_GET_SUCCESS,
  CART_ADD_FAIL,
  CART_ADD_SUCCESS,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,
  BUY_PROCESS_FAIL,
  BUY_PROCESS_SUCCESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_SUCCESS,
  BUY_PROCESS_LOADING,
  BUY_PROCESS_CLEAN,
} from "../types";
import axios from "axios";
import { IBills } from "../../types/interfaces";

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
    dispatch(returnErrors(err.response.data, err.response.status));
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
    dispatch(returnErrors(err.response.data, err.response.status));
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

    const result = await axios.get(
      `/api/users/cart/remove?productId=${productId}`,
      {
        headers: { authorization: `Bearer ${getState().auth.token}` },
      }
    );

    dispatch({ type: CART_REMOVE_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: CART_REMOVE_FAIL });
  }
};

// Update product quantity in cart
export const updateProductInCart = (
  productId: string,
  quantity: number
) => async (dispatch: Function, getState: Function) => {
  try {
    dispatch({ type: CART_LOADING });

    const result = await axios.get(
      `/api/users/cart/update?productId=${productId}&quantity=${quantity}`,
      {
        headers: {
          authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    dispatch({ type: CART_UPDATE_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: CART_UPDATE_FAIL });
  }
};

//Buy Product Success
export const buyProcess = (details: any, data: any, bills: IBills) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    // Page Loading signal
    dispatch({ type: BUY_PROCESS_LOADING });

    // Axios Body
    const body = {
      details,
      data,
      cart: getState().cart.items,
      contactDetails: getState().auth.user.contactDetails,
      bills,
    };
    // Axios Config
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${getState().auth.token}`,
      },
    };

    await axios.post("/api/users/cart/buyProcessDone", body, config);

    // Success
    dispatch({ type: BUY_PROCESS_SUCCESS });
    dispatch(loadCart());
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: BUY_PROCESS_FAIL });
  }
};

export const cleanBuyProcessState = () => (dispatch: Function) =>
  dispatch({ type: BUY_PROCESS_CLEAN });
