import React from "react";
import { CurrencyFormatter } from "../../../utils/Formatter";

import { Paper } from "@material-ui/core";
import { IBills } from "../../../types/interfaces";

const Bills = ({ orderTotal, deliveryFee, totalPayment }: IBills) => {
  return (
    <Paper elevation={1}>
      {/* Title  */}
      <div className="bg-gray-400">
        <h6 className="font-semibold py-2 ml-2 uppercase">Summary</h6>
      </div>
      {/* Title End */}
      {/* Contents */}
      <div className="font-medium">
        {/* Order Total */}
        <div className="border-bottom border-solid flex justify-between py-1">
          <p className="ml-2">Order Total :</p>
          <p className="mr-2">{CurrencyFormatter(orderTotal)}</p>
        </div>
        {/* Order Total End*/}

        {/* Total billed amount */}
        <div className="flex justify-between mb-1">
          <p className="ml-2">Total billed amount :</p>
          <p className="mr-2">{CurrencyFormatter(orderTotal)}</p>
        </div>
        {/* Total billed amount End */}

        {/* Delivery Fee */}
        <div className="flex justify-between mb-1">
          <p className="ml-2">Delivery Fee :</p>
          <p className="mr-2">{CurrencyFormatter(deliveryFee)}</p>
        </div>
        {/* Delivery Fee End */}

        {/* Total Payment */}
        <div className="flex justify-between py-1 border-top border-solid">
          <p className="ml-2 text-red-600">Total Payment :</p>
          <p className="mr-2">{CurrencyFormatter(totalPayment)}</p>
        </div>
        {/* Total payment end*/}
      </div>
      {/* Contents end */}
    </Paper>
  );
};

export default Bills;
