import React, { useEffect } from "react";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./context/store";

import AppNavbar from "./components/AppNavbar";
import { loadUser } from "./context/actions/AuthAction";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <AppNavbar />
      </div>
    </Provider>
  );
}

export default App;
