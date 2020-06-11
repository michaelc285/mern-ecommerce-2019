import {
  HISTORY_LOADING,
  HISTORY_GET_SUCCESS,
  HISTORY_GET_FAIL,
} from "../types";
import { returnErrors } from "./ErrorActions";
import axios from "axios";
export const getUserHistory = () => async (
  dispatch: Function,
  getState: Function
) => {
  dispatch({ type: HISTORY_LOADING });
  try {
    let accesstoken = getState().auth.token;

    const result = await axios.get("/api/users/history", {
      headers: { authorization: `Bearer ${accesstoken}` },
    });

    dispatch({ type: HISTORY_GET_SUCCESS, payload: result.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    return dispatch({ type: HISTORY_GET_FAIL });
  }
};
