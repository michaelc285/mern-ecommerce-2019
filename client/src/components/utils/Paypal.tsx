import React, { useEffect, useRef } from "react";
import { IPaypal } from "../../types/interfaces";

const PaypalButton = ({ amount, onSuccess }: IPaypal) => {
  // const [paidFor, setPaidFor] = React.useState(false);
  // const [error, setError] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  let paypalRef = useRef<any>();

  useEffect(() => {
    (window as any).paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const details = await actions.order.capture();
          // setPaidFor(true);

          onSuccess(details, data);
        },
        onError: (err: any) => {
          // setError(err);
          console.error(err);
        },
        style: {
          color: "white",
        },
      })
      .render(paypalRef.current);
  }, [amount, onSuccess]);

  // if (paidFor) {
  //   return (
  //     <div>
  //       <h1>Congrats, you just bought !</h1>
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* {error && <div>Uh oh, an error occurred! {error}</div>} */}
      <div ref={paypalRef} />
    </div>
  );
};

export default PaypalButton;
