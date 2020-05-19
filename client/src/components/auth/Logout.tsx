import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../context/actions/AuthAction";
import { ILogout } from "../../types/interfaces";
import { Link } from "@material-ui/core";
import { HOME_PAGE } from "../../context/path";

const Logout = ({ logout }: ILogout) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <Link
        href={HOME_PAGE}
        onClick={handleLogout}
        className="text-decoration-none"
        color="textPrimary"
      >
        Logout
      </Link>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
