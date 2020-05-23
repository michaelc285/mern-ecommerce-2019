import { GET_ERRORS, CLEAR_ERRORS } from "../types";
import { IAction } from "../../types/interfaces";

const initialState = {
  msg: {},
  labels: [],
  status: null,
  id: null,
};

export default (state: any = initialState, action: IAction) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        labels: action.payload.labels,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        lable: [],
        status: null,
        id: null,
      };
    default:
      return state;
  }
};
