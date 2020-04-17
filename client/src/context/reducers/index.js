import { combineReducers } from "redux";
import authReducer from "../reducers/AuthReducer";
import errorReducer from "../reducers/ErrorReducer";
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
});
