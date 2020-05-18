import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Paper,
} from "@material-ui/core";
import { IRegister, IAuthReduxProps } from "../../types/interfaces";
import { makeStyles, Theme } from "@material-ui/core/styles";
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
  let history = useHistory();
  const [message, setMessage] = useState<string[] | null>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("missing fields");
    } else {
      const newUser = { name, email, password };
      register(newUser)
        .then(() => history.push("/"))
        .catch((err) => alert(err));
    }
  };

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
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            id="regName"
            label="Name"
            variant="outlined"
            name="regName"
            className="mb-3"
            value={name}
            onChange={handleName}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="regEmail"
            name="regEmail"
            label="Email Address"
            variant="outlined"
            className="mb-3"
            value={email}
            onChange={handleEmail}
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
            value={password}
            onChange={handlePassword}
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
      </form>
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
