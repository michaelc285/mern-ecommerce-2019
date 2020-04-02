import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-md bg-light">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/a" className="nav-link">
                A
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/b" className="nav-link">
                B
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
