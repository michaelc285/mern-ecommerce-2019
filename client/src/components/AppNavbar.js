import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({}));

const AppNavbar = ({ auth }) => {
  const [isOpen, setIsPoen] = useState(false);

  const toggle = () => {
    setIsPoen(!isOpen);
  };
  const userLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{auth.user ? `Welcome ${auth.user.name}` : ""}</strong>
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
            <NavLink href="/market" style={{ color: "gray" }}>
              Market
            </NavLink>
            <NavLink href="/productcreate" style={{ color: "gray" }}>
              Product Create
            </NavLink>
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
