import React, { useMemo, useState } from "react";
import PaypalButton from "../../utils/Paypal";
import { Paper, FormControl, Radio, FormControlLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { buyProcess } from "../../../context/actions/CartAction";
import { IPayment, IUserShippingDetailsBody } from "../../../types/interfaces";
import { RootState } from "../../../context/store";

const checkContact = (contactDetails: IUserShippingDetailsBody) => {
  const {
    addressLine1,
    addressLine2,
    phone,
    postalCode,
    townOrCity,
  } = contactDetails;
  if (addressLine1 && addressLine2 && postalCode && townOrCity && phone) {
    return true;
  } else {
    return false;
  }
};

const Payment = ({ totalPayment }: IPayment) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [paymentAvaliable, setPaymentAvaliable] = useState(false);
  useMemo(() => setPaymentAvaliable(checkContact(user.contactDetails)), [
    user.contactDetails,
  ]);

  const onSuccess = (details: any, data: any) =>
    dispatch(buyProcess(details, data));
  return (
    <Paper elevation={1}>
      {/* Title */}
      <div className="bg-gray-400">
        <h6 className="font-semibold py-2 ml-2 uppercase">Payment</h6>
      </div>
      {/* Title end */}

      {/* Paypal Button */}
      {paymentAvaliable ? (
        <div>
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
          <div className="mx-auto w-2/3">
            <PaypalButton amount={totalPayment} onSuccess={onSuccess} />
          </div>
        </div>
      ) : (
        <div className="py-2">
          <div className="w-2/3 mx-auto text-center border border-solid border-black rounded p-2">
            <p className="font-semibold text-red-500 select-none">
              Please Provide Shipping Details...
            </p>
          </div>
        </div>
      )}

      {/* Paypal butto end */}
    </Paper>
  );
};

export default Payment;
