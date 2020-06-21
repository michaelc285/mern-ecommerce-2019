import { combineReducers } from "redux";
import {
  authReducer,
  userDetailsReducer,
  usersListReducer,
  userDeleteReducer,
  userUpdate,
  userCreateByAdminReducer,
  contactDetailsUpdate,
} from "../reducers/AuthReducer";
import errorReducer from "../reducers/ErrorReducer";
import {
  productListReducer,
  productDetailsReducer,
  productEditReducer,
} from "../reducers/ProductReducer";
import { buyProcessReducer, cartReducer } from "../reducers/CartReducer";
import HistoryReducer from "../reducers/HistoryReducer";
export default combineReducers({
  auth: authReducer,
  userList: usersListReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdate,
  contactDetailsUpdate: contactDetailsUpdate,
  userCreateByAdmin: userCreateByAdminReducer,
  cart: cartReducer,
  buyProcess: buyProcessReducer,
  error: errorReducer,
  history: HistoryReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productEdit: productEditReducer,
});
