import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </div>
    </Router>
  );
}

export default App;
