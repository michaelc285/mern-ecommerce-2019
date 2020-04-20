import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../context/actions/AuthAction";
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

const Register = ({ isAuthenticated, register, error, clearErrors }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);

  const toggle = useCallback(() => {
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const newUser = {
        name,
        email,
        password,
      };

      register(newUser);
    } else {
      alert("password not match");
    }
  };

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
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {message ? <Alert color="danger">{message}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onChangeName}
              />
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
              <Label for="Password">password Confirm</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="mb-3"
                onChange={onChangeConfirmPassword}
              />
              <Button color="dark" style={{ marginTop: "2rem" }}>
                Register
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

export default connect(mapStateToProps, { register, clearErrors })(Register);
