import React from "react";
import { CurrencyFormatter, DateFormatter } from "../../../utils/Formatter";
import { NavLink } from "react-router-dom";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IHistoryContainer } from "../../../types/interfaces";

const HistoryContainer = ({ data }: IHistoryContainer) => {
  // init totalPrice
  let totalPrice = 0;
  // record in row
  const content = data.history.map((item, index) => {
    totalPrice += item.price * item.quantity;
    return (
      <ExpansionPanelDetails key={`${data.id}-${index}`}>
        <div className="w-full flex flex-col md:flex-row">
          <div className="flex-grow">
            <label className="text-sm font-medium text-gray-500">
              Product Name
            </label>
            <NavLink to={`/product/${item.id}`} exact className="no-underline">
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
            </NavLink>
          </div>

          <div
            className=" flex flex-col md:flex-row md:justify-around"
            style={{ width: "400px" }}
          >
            <div style={{ minWidth: "100px" }}>
              <label className="text-sm font-medium text-gray-500">
                Quantity
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {item.quantity}
              </p>
            </div>

            <div style={{ minWidth: "100px" }}>
              <label className="text-sm font-medium text-gray-500">Price</label>
              <p className="text-lg font-semibold text-gray-900">
                {CurrencyFormatter(item.price)}
              </p>
            </div>

            <div style={{ minWidth: "100px" }}>
              <label className="text-sm font-medium text-gray-500">
                Sub Total
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {CurrencyFormatter(item.quantity * item.price)}
              </p>
            </div>
          </div>
        </div>
      </ExpansionPanelDetails>
    );
  });

  // History Container
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="history-container"
        id="history-container"
        style={{ borderBottom: "1px solid rgb(144,144,144)" }}
      >
        <div className="w-full flex flex-col md:flex-row">
          <div className="py-2 flex-grow">
            <Typography>
              <strong>Order:</strong> {data.id}
            </Typography>
          </div>

          <div
            className="p-2 mr-3 flex md:justify-between"
            style={{ minWidth: "175px" }}
          >
            <Typography>
              <strong>Date:</strong>&nbsp;
            </Typography>
            <Typography>{DateFormatter(data.purchaseAt)}</Typography>
          </div>

          <div
            className="py-2 flex md:justify-between"
            style={{ minWidth: "130px" }}
          >
            <Typography>
              <strong>Total:</strong>&nbsp;
            </Typography>
            <Typography>{CurrencyFormatter(totalPrice)}</Typography>
          </div>
        </div>
      </ExpansionPanelSummary>
      {content}
    </ExpansionPanel>
  );
};

export default HistoryContainer;
