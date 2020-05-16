import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Paper,
} from "@material-ui/core";
import { useFormik } from "formik";
import { IRegister, IAuthReduxProps } from "../../types/interfaces";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Form } from "reactstrap";
import { REGISTER_FAIL } from "../../context/types";
import Alert from "@material-ui/lab/Alert";
import { v4 as uuidv4 } from "uuid";

const Register = ({
  isAuthenticated,
  register,
  error,
  clearErrors,
}: IRegister) => {
  const classes = useStyles();

  const [message, setMessage] = useState<string[] | null>();

  const formik = useFormik({
    initialValues: {
      regName: "",
      regEmail: "",
      regPassword: "",
    },
    onSubmit: (newUser) => {
      register({
        name: newUser.regName,
        email: newUser.regEmail,
        password: newUser.regPassword,
      });
    },
  });

  useEffect(() => {
    if (error.id === REGISTER_FAIL) {
      setMessage([REGISTER_FAIL]);
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
      <Typography gutterBottom={true}>Sign-Up</Typography>
      {message ? alertMessage : null}
      <Form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <TextField
            id="regName"
            label="Name"
            variant="outlined"
            name="regName"
            className="mb-3"
            value={formik.values.regName}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="regEmail"
            name="regEmail"
            label="Email Address"
            variant="outlined"
            className="mb-3"
            value={formik.values.regEmail}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type="password"
            id="regPassword"
            label="Password"
            variant="outlined"
            name="regPassword"
            className="mb-3"
            value={formik.values.regPassword}
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
            Sign Up
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

export default connect(mapStateToProps, { register, clearErrors })(Register);
