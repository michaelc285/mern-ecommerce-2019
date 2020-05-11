import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { PAYPAL_CLIENT_ID } from "../../privateinfo";
import { IPaypal } from "../../types/interfaces";

const Paypal = ({ amount, onSuccess }: IPaypal) => {
  return (
    <PayPalButton
      shippingPreference={"NO_SHIPPING"}
      amount={amount}
      currency={"USD"}
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={onSuccess}
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: "USD",
        disableFunding: "card",
      }}
      style={{ color: "white" }}
    />
  );
};

export default Paypal;
