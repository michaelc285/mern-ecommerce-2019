import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../context/actions/AuthAction";

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

const Register = ({ isAuthenticated, register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

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

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        SIGN UP
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
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
});
export default connect(mapStateToProps, { register })(Register);
