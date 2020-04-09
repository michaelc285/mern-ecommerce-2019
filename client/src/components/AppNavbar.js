import React, { Fragment, useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/actions/AuthAction";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Logout } from "./auth/Logout";

export const AppNavbar = () => {
  const { isAuthenticated, user, loadUser } = useContext(AuthContext);
  const [isOpen, setIsPoen] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const toggle = () => {
    setIsPoen(!isOpen);
  };
  const userLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.data.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Login />
      </NavItem>
      <NavItem>
        <Register />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? userLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
