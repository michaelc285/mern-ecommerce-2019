import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { IAppNavbar, IAuthReduxProps } from "../types/interfaces";
import { Link } from "react-router-dom";
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
import { IconButton, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";

const AppNavbar = ({ auth }: IAppNavbar) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const userLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{auth && auth.user ? `Hi, ${auth.user.name}` : ""}</strong>
        </span>
      </NavItem>
      {/* Cart Icon */}
      <Link to="/user/cart">
        <IconButton color="default">
          <Badge
            badgeContent={
              auth && auth.user && auth.user.cart ? auth.user.cart.length : 0
            }
            color="error"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Link>
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
    <Navbar color="dark" dark expand="sm" className="mb-5" fixed="top">
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
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
