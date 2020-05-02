import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../context/actions/AuthAction";
import { NavLink } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ILogout } from "../../types/interfaces";

const Logout = ({ logout }: ILogout) => {
  let history = useHistory();

  const handleLogout = () => {
    logout().then(() => history.push("/market"));
  };

  return (
    <Fragment>
      <NavLink onClick={handleLogout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
