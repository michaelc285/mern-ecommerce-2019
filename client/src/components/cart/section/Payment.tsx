import React from "react";
import PaypalButton from "../../utils/Paypal";
import { Paper, FormControl, Radio, FormControlLabel } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { buyProcess } from "../../../context/actions/CartAction";
import { IPayment } from "../../../types/interfaces";

const Payment = ({ totalPayment }: IPayment) => {
  const dispatch = useDispatch();

  const onSuccess = (details: any, data: any) =>
    dispatch(buyProcess(details, data));

  return (
    <Paper elevation={1}>
      {/* Title */}
      <div className="bg-gray-400">
        <h6 className="font-semibold py-2 ml-2 uppercase">Payment</h6>
      </div>
      {/* Title end */}
      {/* Option button */}
      <FormControl component="fieldset" className="ml-4">
        <FormControlLabel
          value="end"
          control={<Radio color="secondary" />}
          label="PayPal"
          checked
        />
      </FormControl>
      {/* Option button end */}
      {/* Paypal Button */}
      <div className="mx-auto w-2/3">
        <PaypalButton amount={totalPayment} onSuccess={onSuccess} />
      </div>
      {/* Paypal butto end */}
    </Paper>
  );
};

export default Payment;
