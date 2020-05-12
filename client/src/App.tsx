import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./context/store";
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
import "./App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<div>Loading</div>}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              minHeight: "100vh",
            }}
          >
            {/* !!! Add a top cotainer here to display some pic for decoration  */}
            {/* <TopContainer /> */}
            <AppNavbar />

            <Container
              maxWidth="lg"
              style={{ minHeight: "90vh", paddingTop: "90px" }}
            >
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
                {/* <Route exact path="/user/cart" component={CartPage} /> */}
                <ProtectedRoute exact path="/user/cart" component={CartPage} />
                {/* Admin Route */}
                <Route exact path="/productcreate" component={ProductCreate} />
                {/* <ProtectedRoute
                  exact
                  path="/productcreate"
                  store={store}
                  component={ProductCreate}
                /> */}

                {/* Page Not Found Route */}
                <Route path="*" component={ErrorPage} />
              </Switch>
            </Container>

            <AppFooter />
          </div>
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
