import React, { Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import PaypalButton from "../../utils/Paypal";
import {
  Paper,
  Grid,
  Typography,
  FormControl,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { connect } from "react-redux";
import { buyProcess } from "../../../context/actions/CartAction";

import { IPayment } from "../../../types/interfaces";

const Payment = ({ totalPayment, buyProcess }: IPayment) => {
  const classes = useStyles();

  const onSuccess = (details: any, data: any) => buyProcess(details, data);

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
          <Grid item className={classes.button}>
            {/* <PaypalButton amount={totalPayment} onSuccess={onSuccess} /> */}
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
    justifyContent: "center",
  },
}));

export default connect(null, { buyProcess })(Payment);
