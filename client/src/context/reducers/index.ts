import { combineReducers } from "redux";
import authReducer from "../reducers/AuthReducer";
import errorReducer from "../reducers/ErrorReducer";
import {
  productListReducer,
  productDetailsReducer,
  productEditReducer,
} from "../reducers/ProductReducer";
import cartReducer from "../reducers/CartReducer";
import HistoryReducer from "../reducers/HistoryReducer";
export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  error: errorReducer,
  history: HistoryReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productEdit: productEditReducer,
});
