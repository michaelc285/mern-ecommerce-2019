import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../context/actions/AuthAction";
import { NavLink } from "reactstrap";

const Logout = ({ logout }) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
