import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
// import store from "./context/store";
import { Provider } from "react-redux";
import { persistor, store } from "./context/store";
import LinearProgress from "@material-ui/core/LinearProgress";
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<LinearProgress />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
