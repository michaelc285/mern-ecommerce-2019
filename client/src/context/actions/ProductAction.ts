import {
  PRODUCT_LOADING,
  PRODUCT_LOADED,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
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

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: createProduct.data });
  } catch (err) {
    dispatch(returnErrors(err.msg, 500));
    dispatch({ type: PRODUCT_CREATE_FAIL });
  }
};
// Get and Search Product
export const getProducts = (filters: object = {}) => async (
  dispatch: Function
) => {
  try {
    // Loading
    dispatch({ type: PRODUCT_LOADING });
    // Get Data
    const result = await axios.post("/api/product/", filters, {
      headers: {
        "content-type": "application/json",
      },
    });

    dispatch({ type: PRODUCT_GET_SUCCESS, payload: result });
  } catch (err) {
    dispatch(returnErrors(err.msg, 500));
    dispatch({ type: PRODUCT_GET_FAIL });
  }
};

// Get Product by Id
export const getProductsById = (
  productId: string | string[],
  type: string = "single"
) => async (dispatch: Function) => {
  try {
    dispatch({ type: PRODUCT_LOADING });

    const result = await axios.get(
      `/api/product/?id=${productId}&type=${type}`
    );

    dispatch({ type: PRODUCT_GET_SUCCESS, payload: result });
  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.message, 500));
    dispatch({ type: PRODUCT_GET_FAIL });
  }
};
