import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../context/actions/AuthAction";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ILogout } from "../../types/interfaces";

const Logout = ({ logout }: ILogout) => {
  let history = useHistory();

  const handleLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
