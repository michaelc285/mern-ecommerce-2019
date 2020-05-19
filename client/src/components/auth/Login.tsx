import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import { ILogin, IAuthReduxProps } from "../../types/interfaces";
import Alert from "@material-ui/lab/Alert";
import { LOGIN_FAIL } from "../../context/types";
import { v4 as uuidv4 } from "uuid";
import { SIGN_UP } from "../../context/path";

const Login = ({ isAuthenticated, login, clearErrors, error }: ILogin) => {
  const classes = useStyles();
  let history = useHistory();
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
      const user = { email, password };
      login(user)
        .then(() => history.push("/"))
        .catch((err) => alert(err));
    }
  };

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
    <Container maxWidth="sm">
      <Paper elevation={7} className={classes.root}>
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
