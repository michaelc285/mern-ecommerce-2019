import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./context/store";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@material-ui/core/Container";

import { loadUser } from "./context/actions/AuthAction";

import TopContainer from "./components/TopContainer";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* !!! Add a top cotainer here to display some pic for decoration  */}
          {/* <TopContainer /> */}
          <AppNavbar />

          <Container
            maxWidth="lg"
            style={{ minHeight: "90vh", paddingTop: "7rem" }}
          >
            <Switch>
              <Route path="/" exact component={MarketLanding} />
              <Route path="/market" exact component={MarketLanding} />
              <Route path="/productcreate" exact component={ProductCreate} />
              <Route
                path="/product/:productID"
                exact
                component={ProductDetailPage}
              />
              <Route path="/user/cart" exact component={CartPage} />
              <Route component={ErrorPage} />
            </Switch>
          </Container>

          <AppFooter />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
