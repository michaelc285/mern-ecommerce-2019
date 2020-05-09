import React, { Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
const Bills = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper elevation={7} className={classes.root}>
        <Grid container direction={"column"}>
          <Grid item xl={3} className={classes.boxTitle}>
            <Typography className={classes.textContent} variant={"h6"}>
              Summary
            </Typography>
          </Grid>
          <Grid
            item
            xl={2}
            className={classes.subTitle}
            style={{ borderBottom: " 1px solid rgb(180, 180, 180)" }}
          >
            <Typography className={classes.textContent}>Order total</Typography>
            <Typography className={classes.textContent}>$ XXX</Typography>
          </Grid>
          <Grid item xl={2} className={classes.subTitle}>
            <Typography className={classes.textContent}>
              Total billed amount
            </Typography>
            <Typography className={classes.textContent}>$ XXX</Typography>
          </Grid>
          <Grid item xl={2} className={classes.subTitle}>
            <Typography className={classes.textContent}>
              Delivery Fee
            </Typography>
            <Typography className={classes.textContent}>$ XXX</Typography>
          </Grid>
          <Grid item xl={3} className={classes.subTitle}>
            <Typography color={"secondary"} className={classes.textContent}>
              Total Payment
            </Typography>
            <Typography className={classes.textContent}>$ XXX</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "5vh",
  },
  textContent: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  boxTitle: {
    padding: "3px",
    backgroundColor: "rgb(180, 180, 180)",
  },
  subTitle: {
    marginBottom: "2px",
    display: "flex",
    justifyContent: " space-between",
  },
}));

export default Bills;
