import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { login } from "../../context/actions/AuthAction";

import { clearErrors } from "../../context/actions/ErrorActions";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import { LOGIN_FAIL } from "../../context/types";
import { v4 as uuidv4 } from "uuid";
import { MARKET_LANDING, SIGN_UP } from "../../path";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const error = useSelector((state: RootState) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string[] | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!email || !password) {
      alert("missing fields");
    } else {
      const loginUser = { email, password };

      dispatch(login(loginUser));
    }
  };

  useEffect(() => {
    if (error.id === LOGIN_FAIL && error.labels && error.labels.length > 0) {
      setMessage([...error.labels]);
    } else {
      setMessage(null);
    }

    if (isAuthenticated) {
      history.push(MARKET_LANDING);
      dispatch(clearErrors());
    }
  }, [error, isAuthenticated, dispatch, history]);

  const alertMessage =
    message &&
    message.length > 0 &&
    message.map((msg) => (
      <Alert severity="error" key={uuidv4()}>{`${msg.replace(
        /_/g,
        " "
      )}`}</Alert>
    ));

  return (
    <div className="min-h-screen">
      <div className="p-5">
        <Container maxWidth="sm">
          <Paper elevation={3} className="p-3">
            <Typography gutterBottom={true} variant={"h5"}>
              Sign-In
            </Typography>
            {message ? alertMessage : null}

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <TextField
                  type="email"
                  id="loginEmail"
                  label="Email"
                  variant="outlined"
                  name="loginEmail"
                  className="mb-3"
                  value={email}
                  onChange={handleEmailChange}
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
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Sign In
                </Button>
              </FormControl>
              <div className="w-100 d-flex flex-column align-items-center">
                <Typography variant={"subtitle1"}> or</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="w-100"
                  href={SIGN_UP}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Login;
