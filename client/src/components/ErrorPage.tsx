import React, { Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core/";
const ErrorPage = () => {
  //const classes = useStyles();
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

//const useStyles = makeStyles((theme: Theme) => ({
//}));

export default ErrorPage;
