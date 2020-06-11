import { E_ERROR } from "./enum";

// React
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

//Errors
export interface IMsg {
  msg: string | any;
}

// ***************
//  Auth
// ***************
export interface IUser {
  name?: string;
  email: string;
  password: string;
  cart?: string[];
  history?: string[];
}

export interface IError {
  id: E_ERROR;
  msg: IMsg;
  labels: string[];
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILogin extends IAuthForm {
  login(user: IUser): Promise<boolean>;
}

export interface IRegister extends IAuthForm {
  register(user: IUser): Promise<boolean>;
}

export interface ILogout {
  logout(): Promise<boolean>;
}

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  error: IError;
}

// ***************
//  Navbar
// ***************
export interface IAppNavbar {
  auth?: {
    token: string;
    isAuthenticated: boolean;
    user: IUser;
  };
}

// ***************
//  Context
// ***************

export interface IAction {
  type: string;
  payload?: any;
}

// ***************
//  Product
// ***************

export interface IProduct {
  _id: string;
  title: string;
  type: string;
  price: number;
  description: string;
  images: string[];
  quantity: number;
  sold: number;
  createAt: string;
  updateAt: string;
  creator?: string | object;
}

export interface IProductDetailPage {
  match: any;
}

export interface IPanel {
  product: any;
}

// ***************
//  Cart
// ***************

export interface ICartItem {
  id: string;
  quantity: number;
  date: number;
}

export interface ICartItemDetail {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  images: string[];
  type: string;
  description: string;
}

export interface ICartPage {
  authIsLoading: boolean;
  items: ICartItemDetail[];
  cartIsLoading: boolean;
  loadCart(): void;
}

export interface IProductsList {
  items: ICartItem;
  cartIsLoading: boolean;
}

export interface IPayment {
  totalPayment: number;
}

export interface IBills {
  orderTotal: number;
  deliveryFee: number;
  totalPayment: number;
}

// ***************
//  Utils
// ***************
export interface IPaypal {
  amount: number;
  onSuccess(details: any, data: any): void;
}

export interface IAlertBar {
  msg: string;
}

// ***************
//  History
// ***************

export interface IOrderProduct {
  purchaseAt: number;
  name: string;
  id: string;
  price: number;
  quantity: number;
  orderID: string;
}

export interface IHistory {
  id: string;
  purchaseAt: number;
  history: IOrderProduct[];
}

export interface IHistoryContainer {
  data: IHistory;
}

// ***************
//  User Control Panel
// ***************

export interface IUserDetailsPage {
  match: any;
}

export interface IHistoryRow {
  data: IHistory;
}

export interface IHistoryUserDetailsPage {
  data: IHistory[];
}

export interface IUserUpdateBody {
  name?: string;
  email?: string;
  role?: boolean | number;
  password?: string;
}
