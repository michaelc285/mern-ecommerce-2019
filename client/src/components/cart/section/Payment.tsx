import React, { Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  FormControl,
  Button,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

const Payment = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper elevation={7}>
        <Grid container direction={"column"}>
          <Grid item className={classes.boxTitle}>
            <Typography className={classes.textContent} variant={"h6"}>
              Payment
            </Typography>
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <FormControlLabel
                className={classes.subTitle}
                value="end"
                control={<Radio color="secondary" />}
                label="Paypal"
                checked
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              href="#"
              className={classes.button}
            >
              Confirm Payment
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "5vh",
  },

  textContent: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  boxTitle: {
    padding: "3px",
    backgroundColor: "rgb(180, 180, 180)",
  },
  subTitle: {
    marginLeft: "2px",
  },
  button: {
    display: "flex",
    margin: " 0 7px 7px 7px",
  },
}));

export default Payment;
