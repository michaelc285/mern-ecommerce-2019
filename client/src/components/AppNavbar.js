import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";

const AppNavbar = ({ auth }) => {
  const [isOpen, setIsPoen] = useState(false);

  const toggle = () => {
    setIsPoen(!isOpen);
  };
  const userLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{auth.user ? `Welcome ${auth.user.data.name}` : ""}</strong>
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
          <NavLink href="/market" style={{ color: "gray" }}>
            Market
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {auth && auth.isAuthenticated ? userLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(AppNavbar);
