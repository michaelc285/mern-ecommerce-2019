import { IAction } from "../../types/interfaces";
import {
  HISTORY_LOADING,
  HISTORY_GET_SUCCESS,
  HISTORY_GET_FAIL,
  HISTORY_CLEAR,
} from "../types";
const initialState = {
  isLoading: false,
  data: [],
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case HISTORY_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case HISTORY_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.history,
      };
    case HISTORY_CLEAR:
      return {
        isLoading: false,
        data: [],
      };
    case HISTORY_GET_FAIL:
    default:
      return state;
  }
};
