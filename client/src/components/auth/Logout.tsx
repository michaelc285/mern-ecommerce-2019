import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../context/actions/AuthAction";
import { ILogout } from "../../types/interfaces";
import { NavLink } from "react-router-dom";
import { HOME_PAGE } from "../../context/path";

const Logout = ({ logout }: ILogout) => {
  const handleLogout = () => {
    logout().then((success) => {
      if (success) {
        console.log(success);
      }
    });
  };

  return (
    <Fragment>
      <NavLink
        to={HOME_PAGE}
        onClick={handleLogout}
        className="text-decoration-none text-primary"
      >
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
