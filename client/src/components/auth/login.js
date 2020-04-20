import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { login } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";

const Login = ({ isAuthenticated, login, clearErrors, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);

  const toggle = useCallback(() => {
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };

    login(loginUser);
  };

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
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {message ? <Alert color="danger">{message}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChangeEmail}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChangePassword}
              />
              <Button color="dark" style={{ marginTop: "2rem" }}>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
