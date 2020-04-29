import { combineReducers } from "redux";
import authReducer from "../reducers/AuthReducer";
import errorReducer from "../reducers/ErrorReducer";
import productReducer from "../reducers/ProductReducer";
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  product: productReducer,
});
