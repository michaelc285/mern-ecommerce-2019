import { combineReducers } from "redux";
import authReducer from "../reducers/AuthReducer";
import errorReducer from "../reducers/ErrorReducer";
import productReducer from "../reducers/ProductReducer";
import cartReducer from "../reducers/CartReducer";
import HistoryReducer from "../reducers/HistoryReducer";
export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  error: errorReducer,
  history: HistoryReducer,
  product: productReducer,
});
