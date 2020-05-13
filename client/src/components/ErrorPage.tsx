import React, { Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core/";
const ErrorPage = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography variant={"h3"}> 404 NOT FOUND</Typography>
        </div>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  content: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default ErrorPage;
