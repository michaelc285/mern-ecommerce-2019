import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";
import { TextField, Button, FormControl } from "@material-ui/core";
import { useFormik } from "formik";
import { IRegister, IAuthReduxProps } from "../../types/interfaces";
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
  const [modal, setModal] = useState(false);
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

  const toggle = useCallback(() => {
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
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
        SIGN UP
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
        <ModalBody>
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
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
