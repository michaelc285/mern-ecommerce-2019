import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";
import { useFormik } from "formik";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Paper,
} from "@material-ui/core";
import { ILogin, IAuthReduxProps } from "../../types/interfaces";
import Alert from "@material-ui/lab/Alert";
import { Form } from "reactstrap";
import { LOGIN_FAIL } from "../../context/types";
import { v4 as uuidv4 } from "uuid";

const Login = ({ isAuthenticated, login, clearErrors, error }: ILogin) => {
  const classes = useStyles();

  const [message, setMessage] = useState<string[] | null>(null);
  const formik = useFormik({
    initialValues: {
      loginEmail: "",
      loginPassword: "",
    },
    onSubmit: (user) => {
      login({ email: user.loginEmail, password: user.loginPassword });
    },
  });

  useEffect(() => {
    if (error.id === LOGIN_FAIL && error.labels && error.labels.length > 0) {
      setMessage([...error.labels]);
    } else {
      setMessage(null);
    }
  }, [error, isAuthenticated]);

  const alertMessage =
    message &&
    message.length > 0 &&
    message.map((msg) => (
      <Alert
        className={classes.alertbar}
        severity="error"
        key={uuidv4()}
      >{`${msg.replace(/_/g, " ")}`}</Alert>
    ));

  return (
    <Paper elevation={7} className={classes.root}>
      <Typography gutterBottom={true}>Sign-In</Typography>
      {message ? alertMessage : null}

      <Form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <TextField
            type="email"
            id="loginEmail"
            label="Email"
            variant="outlined"
            name="loginEmail"
            className="mb-3"
            value={formik.values.loginEmail}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type="password"
            id="loginPassword"
            label="Password"
            variant="outlined"
            name="loginPassword"
            className="mb-3"
            value={formik.values.loginPassword}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </FormControl>
      </Form>
    </Paper>
  );
};

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "2em",
  },
  alertbar: {
    marginBottom: "10px",
    width: "100%",
  },
}));

// Redux
const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
