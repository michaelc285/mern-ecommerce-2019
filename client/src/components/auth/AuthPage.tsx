import React from "react";
import Login from "./Login";
import Logout from "./Register";
import { Grid, Container } from "@material-ui/core";

const AuthPage = () => {
  return (
    <Container maxWidth="lg" style={{ minHeight: "100vh" }}>
      <Grid container spacing={3}>
        <Grid item xl={6}>
          <Login />
        </Grid>
        <Grid item xl={6}>
          <Logout />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthPage;
