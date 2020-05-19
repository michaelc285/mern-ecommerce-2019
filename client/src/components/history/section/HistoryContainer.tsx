import React from "react";
import { CurrencyFormatter } from "../../../utils/NumberFormatter";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IHistoryContainer } from "../../../types/interfaces";

const HistoryContainer = ({ history }: IHistoryContainer) => {
  // const classes = useStyles();

  // ms to  YYYY-MM-DD  HH:MM
  const date = new Date(history.purchaseAt);
  const formattedDate = date.toISOString().slice(0, 16).replace(/T/g, " ");

  // init totalPrice
  let totalPrice = 0;

  // record in row
  const content = history.history.map((item, index) => {
    totalPrice += item.price * item.quantity;
    return (
      <ExpansionPanelDetails key={`${history.id}-${index}`}>
        <div className="w-100 d-flex flex-column flex-lg-row flex-md-row">
          <div className="w-75">
            <Typography variant={"caption"}>
              <strong>Product Name</strong>
            </Typography>
            <Link href={`/product/${item.id}`} className="text-decoration-none">
              <Typography>{item.name}</Typography>
            </Link>
          </div>

          <div
            className=" d-flex flex-column flex-lg-row flex-md-row justify-content-lg-around justify-content-md-around"
            style={{ width: "400px" }}
          >
            <div style={{ minWidth: "100px" }}>
              <Typography variant={"caption"}>
                <strong>Quantity</strong>
              </Typography>
              <Typography>{item.quantity}</Typography>
            </div>

            <div style={{ minWidth: "100px" }}>
              <Typography variant={"caption"}>
                <strong>Price</strong>
              </Typography>
              <Typography>{CurrencyFormatter(item.price)}</Typography>
            </div>

            <div style={{ minWidth: "100px" }}>
              <Typography variant={"caption"}>
                <strong>Sub Total </strong>
              </Typography>
              <Typography>
                {CurrencyFormatter(item.quantity * item.price)}
              </Typography>
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
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="border-bottom "
      >
        <div className="w-100 d-flex flex-column flex-md-row flex-lg-row flex-xl-row">
          <div className="p2 flex-grow-1">
            <Typography>
              <strong>Order:</strong> {history.id}
            </Typography>
          </div>

          <div
            className="p2 mr-3 d-flex justify-content-lg-between justify-content-md-between"
            style={{ minWidth: "175px" }}
          >
            <Typography>
              <strong>Date:</strong>&nbsp;
            </Typography>
            <Typography>{formattedDate}</Typography>
          </div>

          <div
            className="p2 d-flex justify-content-lg-between justify-content-md-between"
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
// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginBottom: "10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      flex: 6,
    },
    product: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    ExpansionBox: {
      border: "1px solid gray",
    },
    productTitle: {
      flex: 3,
      borderRight: "1px dotted gray ",
      marginLeft: "10px",
      display: "flex",
      flexDirection: "column",
    },
    productDetailBox: {
      paddingLeft: "15px",
      flex: 2,
      display: "flex",
    },
    subDetailBox: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    totalPrice: {
      float: "right",
      marginRight: "50px",
    },
    header: {
      display: "flex",
      width: "100%",
    },
  })
);

export default HistoryContainer;
