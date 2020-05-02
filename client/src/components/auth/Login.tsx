import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { login } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";
import { useFormik } from "formik";
import { TextField, Button, FormControl } from "@material-ui/core";
import { ILogin, IAuthReduxProps } from "../../types/interfaces";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  NavLink,
  Alert,
} from "reactstrap";

const Login = ({ isAuthenticated, login, clearErrors, error }: ILogin) => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (user) => {
      login(user);
    },
  });
  const toggle = useCallback(() => {
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMessage(error.msg.msg);
    } else {
      setMessage(null);
    }

    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [error, toggle, isAuthenticated, modal]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        SIGN IN
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
        <ModalBody>
          {message ? <Alert color="danger">{message}</Alert> : null}
          <Form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <TextField
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                name="email"
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
                Sign In
              </Button>
            </FormControl>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
