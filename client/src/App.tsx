import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./context/store";
import ProtectedRoute from "./hoc/ProtectedRoute";
import {
  USER_CART,
  USER_HISTORY,
  CREATE_PRODUCT,
  PRODUCT_DETAILS_PAGE,
  MARKET_LANDING,
  SIGN_IN,
  SIGN_UP,
  PRODUCT_CONTROL_PANEL,
  USER_CONTROL_PANEL,
  ROOT,
  USER_EDIT_PAGE,
  CREATE_ACCOUNT,
  USER_PROFILE,
  PRODUCT_EDIT_PAGE,
} from "./path";
import { loadUser } from "./context/actions/AuthAction";
import { ROLE_ADMIN, ROLE_GUEST, ROLE_USER } from "./context/types";
// Components
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
//import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MarketLanding from "./components/market/MarketLanding";
import ProductCreate from "./components/dashboard/product/ProductCreate";
import ProductDetailPage from "./components/market/productDetailPage/ProductDetailPage";
import CartPage from "./components/cart/CartPage";
//import PurchaseHistoryUser from "./components/history/PurchaseHistoryUser";
import PurchaseHistoryUser2 from "./components/history/PurchaseHistoryUser2";
import ErrorPage from "./components/ErrorPage";
import ProductControlPanelLanding from "./components/dashboard/product/ProductControlPanelLanding";
import UserControlPanelLanding from "./components/dashboard/user/UserControlPanelLanding";
import UserDetailsPage from "./components/dashboard/user/UserDetailsPage";
import UserCreate from "./components/dashboard/user/UserCreate";
import PersonalPage from "./components/auth/PersonalPage";
import ProductEditPage from "./components/dashboard/product/productEditPage/ProductEditPage";

const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, user } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  let role =
    user && user.role ? (user.role === 1 ? ROLE_ADMIN : ROLE_USER) : ROLE_GUEST;

  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <div className="flex justify-center items-center">
            <LinearProgress />
          </div>
        </div>
      }
    >
      <div className="bg-white">
        {/* !!! Add a top cotainer here to display some pic for decoration  */}
        {/* <TopContainer /> */}

        <AppNavbar />
        <Switch>
          {/* Public Route */}
          {/* <Route path={ROOT} exact component={Home} /> */}
          <Route path={ROOT} exact component={MarketLanding} />
          <Route path={MARKET_LANDING} exact component={MarketLanding} />
          <Route
            path={PRODUCT_DETAILS_PAGE}
            exact
            component={ProductDetailPage}
          />
          {/* <Route path={AUTH_PAGE} exact component={AuthPage} /> */}
          <Route path={SIGN_IN} exact component={Login} />
          <Route path={SIGN_UP} exact component={Register} />

          {/* User Route */}
          {/* Cart */}
          <ProtectedRoute
            exact
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={USER_CART}
            component={CartPage}
          />
          {/* History */}
          <ProtectedRoute
            exact
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={USER_HISTORY}
            component={PurchaseHistoryUser2}
          />
          {/* Personal info page */}
          <ProtectedRoute
            exact
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={USER_PROFILE}
            component={PersonalPage}
          />
          {/* Admin Route */}
          {/* User Control Panel */}
          <ProtectedRoute
            exact
            adminRestrict
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={USER_CONTROL_PANEL}
            component={UserControlPanelLanding}
          />
          <ProtectedRoute
            exact
            adminRestrict
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={USER_EDIT_PAGE}
            component={UserDetailsPage}
          />
          <ProtectedRoute
            exact
            adminRestrict
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={CREATE_ACCOUNT}
            component={UserCreate}
          />

          {/* Product Control Panel */}
          <ProtectedRoute
            exact
            adminRestrict
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={PRODUCT_CONTROL_PANEL}
            component={ProductControlPanelLanding}
          />

          <ProtectedRoute
            exact
            adminRestrict
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={CREATE_PRODUCT}
            component={ProductCreate}
          />
          <ProtectedRoute
            exact
            adminRestrict
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={PRODUCT_EDIT_PAGE}
            component={ProductEditPage}
          />

          {/* Page Not Found Route */}
          <Route path="*" component={ErrorPage} />
        </Switch>

        <AppFooter />
      </div>
    </Suspense>
  );
};

export default App;
