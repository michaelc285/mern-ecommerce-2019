import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../context/actions/AuthAction";
import { NavLink } from "react-router-dom";
import { HOME_PAGE } from "../../types/path";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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

export default Logout;
