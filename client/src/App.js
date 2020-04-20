import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./context/store";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AppNavbar from "./components/AppNavbar";
import { loadUser } from "./context/actions/AuthAction";
import ProdcutPage from "./components/product/ProductPage";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <AppNavbar />
          <Switch>
            <Route path="/market" exact component={ProdcutPage} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
