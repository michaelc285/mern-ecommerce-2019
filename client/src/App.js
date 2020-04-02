import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
