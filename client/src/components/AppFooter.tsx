import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const AppFooter = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Grid
        container
        direction={"column"}
        justify={"flex-end"}
        alignItems={"center"}
      >
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Typography> ©2020 Michael Development</Typography>
        </Grid>
        {/* <Grid item>
          <SelectComponent />
        </Grid> */}
      </Grid>
    </footer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    width: "100%",
    minHeight: "2.5em",
    bottom: 0,
    padding: "10px 0 0 0",
  },
}));

export default AppFooter;
