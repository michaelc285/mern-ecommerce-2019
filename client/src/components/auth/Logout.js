import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../context/actions/AuthAction";
import { NavLink } from "reactstrap";

const Logout = ({ logout }) => {
  const handleLogout = () => logout();

  return (
    <Fragment>
      <NavLink onClick={handleLogout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
