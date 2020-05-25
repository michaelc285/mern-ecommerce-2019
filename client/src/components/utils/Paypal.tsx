import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const PaypalButton = (props: any) => {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = async () => {
    const result = await axios.get("/api/config/paypal");
    const clientID = result.data;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=" +
      clientID +
      "&disable-funding=credit,card";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  };

  const createOrder = (data: any, actions: any) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: props.amount,
          },
        },
      ],
    });

  const onApprove = (data: any, actions: any) =>
    actions.order
      .capture()
      .then((details: any) => props.onSuccess(details, data))
      .catch((err: any) => console.log(err));

  useEffect(() => {
    if (!(window as any).paypal) {
      addPaypalSdk();
    }
    return () => {
      //
    };
  }, []);

  if (!sdkReady && !(window as any).paypal) {
    return <div>Loading...</div>;
  }

  const Button = (window as any).paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });

  return (
    <Button
      {...props}
      createOrder={(data: any, actions: any) => createOrder(data, actions)}
      onApprove={(data: any, actions: any) => onApprove(data, actions)}
      style={{ color: "white" }}
    />
  );
};

export default PaypalButton;
