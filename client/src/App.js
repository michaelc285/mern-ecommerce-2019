import React, { useContext, useEffect } from "react";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./context/actions/AuthAction";

import { AppNavbar } from "./components/AppNavbar";

function App() {
  return (
    <AuthProvider>
      <div>
        <AppNavbar />
      </div>
    </AuthProvider>
  );
}

export default App;
