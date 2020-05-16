import { GET_ERRORS, CLEAR_ERRORS } from "../types";
import { IMsg } from "../../types/interfaces";

export const returnErrors = (
  msg: IMsg,
  status: number,
  id: any = null,
  labels: string[] | null = null
) => {
  return { type: GET_ERRORS, payload: { msg, status, id, labels } };
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
