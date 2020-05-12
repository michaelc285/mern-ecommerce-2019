import React, { useState, useCallback, useEffect } from "react";
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
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  NavLink,
  Alert,
} from "reactstrap";

const Register = ({
  isAuthenticated,
  register,
  error,
  clearErrors,
}: IRegister) => {
  const classes = useStyles();

  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (newUser) => {
      register(newUser);
    },
  });

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setMessage(error.msg.msg);
    } else {
      setMessage(null);
    }
  }, [error, isAuthenticated]);

  return (
    <Paper elevation={7} className={classes.root}>
      <Typography gutterBottom={true}>Sign-Up</Typography>
      {message ? <Alert color="danger">{message}</Alert> : null}
      <Form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            name="name"
            className="mb-3"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            className="mb-3"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            className="mb-3"
            value={formik.values.password}
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
}));

// Redux
const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
