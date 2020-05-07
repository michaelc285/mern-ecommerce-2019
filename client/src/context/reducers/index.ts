import { combineReducers } from "redux";
import authReducer from "../reducers/AuthReducer";
import errorReducer from "../reducers/ErrorReducer";
import productReducer from "../reducers/ProductReducer";
import cartReducer from "../reducers/CartReducer";
export default combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  error: errorReducer,
});
