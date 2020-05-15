import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import ProtectedRoute from "./hoc/ProtectedRoute";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@material-ui/core/Container";

import { loadUser } from "./context/actions/AuthAction";

import TopContainer from "./components/TopContainer";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import AuthPage from "./components/auth/AuthPage";
import ErrorPage from "./components/ErrorPage";
import MarketLanding from "./components/product/MarketLanding";
import ProductCreate from "./components/product/ProductCreate";
import ProductDetailPage from "./components/product/DetailPage/ProductDetailPage";
import CartPage from "./components/cart/CartPage";
import PurchaseHistoryUser from "./components/history/PurchaseHistoryUser";

import { ROLE_ADMIN, ROLE_GUEST, ROLE_USER } from "./context/types";

const App = ({ loadUser, auth }: any) => {
  useEffect(() => {
    loadUser();
  }, []);

  let role =
    auth && auth.user
      ? auth.user.role === 1
        ? ROLE_ADMIN
        : ROLE_USER
      : ROLE_GUEST;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* !!! Add a top cotainer here to display some pic for decoration  */}
        {/* <TopContainer /> */}

        <Container
          maxWidth="lg"
          style={{ minHeight: "100vh", paddingTop: "90px" }}
        >
          <AppNavbar />
          <Switch>
            {/* Public Route */}
            <Route path="/" exact component={MarketLanding} />
            <Route path="/market" exact component={MarketLanding} />
            <Route
              path="/product/:productID"
              exact
              component={ProductDetailPage}
            />
            <Route path="/auth" exact component={AuthPage} />
            {/* Authorized Route */}
            <ProtectedRoute
              exact
              isAuthenticated={auth.isAuthenticated}
              role={role}
              authenticationPath={"/auth"}
              path="/user/cart"
              component={CartPage}
            />
            <ProtectedRoute
              exact
              isAuthenticated={auth.isAuthenticated}
              role={role}
              authenticationPath={"/auth"}
              path="/user/history"
              component={PurchaseHistoryUser}
            />
            {/* Admin Route */}
            <ProtectedRoute
              exact
              adminRestrict
              isAuthenticated={auth.isAuthenticated}
              role={role}
              authenticationPath={"/auth"}
              path="/productcreate"
              component={ProductCreate}
            />

            {/* Page Not Found Route */}
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Container>
        <AppFooter />
      </div>
    </Suspense>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(App);
