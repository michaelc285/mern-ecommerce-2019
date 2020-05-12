import React from "react";
import Login from "./Login";
import Logout from "./Register";
import { Grid } from "@material-ui/core";

const AuthPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xl={6}>
        <Login />
      </Grid>
      <Grid item xl={6}>
        <Logout />
      </Grid>
    </Grid>
  );
};

export default AuthPage;
