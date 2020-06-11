import {
  PRODUCT_LIST_GET_FAIL,
  PRODUCT_LIST_GET_SUCCESS,
  PRODUCT_LIST_CREATE_FAIL,
  PRODUCT_LIST_CREATE_SUCCESS,
  PRODUCT_LIST_LOADING,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_GET_SUCCESS,
  PRODUCT_DETAILS_GET_FAIL,
  PRODUCT_EDIT_DELETE_FAIL,
  PRODUCT_EDIT_LOADING,
  PRODUCT_EDIT_DELETE_SUCCESS,
} from "../types";
import axios from "axios";
import { returnErrors } from "./ErrorActions";

// Create Product
export const createProduct = (
  imageFiles: string[],
  productInfo: object
) => async (dispatch: Function, getState: Function) => {
  try {
    let formData = new FormData();
    // Add image file to FormData
    imageFiles.forEach((imageFile) => formData.append("image", imageFile));

    // Access token
    const accesstoken = getState().auth.token;
    // Upload images and get the stored path
    const uploadedImage = await axios.post(
      "/api/product/upload/image",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    // Add image path into productInfo Object
    Object.assign(productInfo, { images: uploadedImage.data.filesPath });

    // Create Product
    const createProduct = await axios.post("/api/product/create", productInfo, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accesstoken}`,
      },
    });

    dispatch({
      type: PRODUCT_LIST_CREATE_SUCCESS,
      payload: createProduct.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: PRODUCT_LIST_CREATE_FAIL });
  }
};
// Get and Search Product
export const getProducts = (filters: object = {}) => async (
  dispatch: Function
) => {
  try {
    // Loading
    dispatch({ type: PRODUCT_LIST_LOADING });
    // Get Data
    const result = await axios.post("/api/product/", filters, {
      headers: {
        "content-type": "application/json",
      },
    });

    dispatch({ type: PRODUCT_LIST_GET_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: PRODUCT_LIST_GET_FAIL });
  }
};

// Get Product by Id
export const getProductsById = (productId: string) => async (
  dispatch: Function
) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_LOADING });

    const result = await axios.get(`/api/product/?id=${productId}`);

    dispatch({ type: PRODUCT_DETAILS_GET_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: PRODUCT_DETAILS_GET_FAIL });
  }
};

// Delete Product by Id
export const deleteProductById = (productId: string) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    dispatch({ type: PRODUCT_EDIT_LOADING });

    await axios.get(`/api/product/remove?productId=${productId}`, {
      headers: { authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({ type: PRODUCT_EDIT_DELETE_SUCCESS });
    getProducts();
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: PRODUCT_EDIT_DELETE_FAIL });
  }
};
