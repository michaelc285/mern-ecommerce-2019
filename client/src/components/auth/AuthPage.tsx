import React from "react";
import Login from "./Login";
import Logout from "./Register";
import { Grid, Container } from "@material-ui/core";

const AuthPage = () => {
  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh" }}>
      <Grid container spacing={3}>
        <Grid item xl={12}>
          <Login />
        </Grid>
        <Grid item xl={12}>
          <Logout />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthPage;
