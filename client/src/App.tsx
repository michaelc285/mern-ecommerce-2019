import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./assets/main.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./context/store";
import ProtectedRoute from "./hoc/ProtectedRoute";
import {
  USER_CART,
  USER_HISTORY,
  CREATE_PRODUCT,
  PRODUCT_PAGE,
  MARKET_LANDING,
  SIGN_IN,
  SIGN_UP,
  PRODUCT_CONTROL_PANEL,
  USER_CONTROL_PANEL,
  ROOT,
} from "./path";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadUser } from "./context/actions/AuthAction";
//import TopContainer from "./components/TopContainer";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
//import AuthPage from "./components/auth/AuthPage";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MarketLanding from "./components/market/MarketLanding";
import ProductCreate from "./components/dashboard/product/ProductCreate";
import ProductDetailPage from "./components/market/productDetailPage/ProductDetailPage";
import CartPage from "./components/cart/CartPage";
import PurchaseHistoryUser from "./components/history/PurchaseHistoryUser";
import ErrorPage from "./components/ErrorPage";
import ProductControlPanelLanding from "./components/dashboard/product/ProductControlPanelLanding";
import UserControlPanelLanding from "./components/dashboard/user/UserControlPanelLanding";
import { ROLE_ADMIN, ROLE_GUEST, ROLE_USER } from "./context/types";

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
          <Route path={ROOT} exact component={Home} />
          <Route path={MARKET_LANDING} exact component={MarketLanding} />
          <Route path={PRODUCT_PAGE} exact component={ProductDetailPage} />
          {/* <Route path={AUTH_PAGE} exact component={AuthPage} /> */}
          <Route path={SIGN_IN} exact component={Login} />
          <Route path={SIGN_UP} exact component={Register} />

          {/* Authorized Route */}

          <ProtectedRoute
            exact
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={USER_CART}
            component={CartPage}
          />
          <ProtectedRoute
            exact
            isAuthenticated={isAuthenticated}
            role={role}
            authenticationPath={SIGN_IN}
            path={USER_HISTORY}
            component={PurchaseHistoryUser}
          />
          {/* Admin Route */}
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
            path={USER_CONTROL_PANEL}
            component={UserControlPanelLanding}
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

          {/* Page Not Found Route */}
          <Route path="*" component={ErrorPage} />
        </Switch>

        <AppFooter />
      </div>
    </Suspense>
  );
};

export default App;
