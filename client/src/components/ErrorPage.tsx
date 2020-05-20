import React, { Fragment } from "react";
import { Typography } from "@material-ui/core/";

const ErrorPage = () => {
  return (
    <Fragment>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: 400 }}
      >
        <Typography variant={"h6"}> 404 NOT FOUND</Typography>
      </div>
    </Fragment>
  );
};

export default ErrorPage;
