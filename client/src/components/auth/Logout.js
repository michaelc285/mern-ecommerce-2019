import React, { Fragment, useContext } from "react";
import { NavLink } from "reactstrap";
import { AuthContext } from "../../context/actions/AuthAction";

export const Logout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};
