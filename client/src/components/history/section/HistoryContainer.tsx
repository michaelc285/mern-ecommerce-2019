import React from "react";
import { CurrencyFormatter } from "../../../utils/NumberFormatter";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IHistoryContainer } from "../../../types/interfaces";
import { Link } from "react-router-dom";

const HistoryContainer = ({ history }: IHistoryContainer) => {
  const classes = useStyles();

  // ms to  YYYY-MM-DD  HH:MM
  const date = new Date(history.purchaseAt);
  const formattedDate = date.toISOString().slice(0, 16).replace(/T/g, " ");

  // init totalPrice
  let totalPrice = 0;

  // Product
  const content = history.history.map((item, index) => {
    totalPrice += item.price * item.quantity;
    return (
      <ExpansionPanelDetails key={`${history.id}-${index}`}>
        <div className={classes.product}>
          <div className={classes.productTitle}>
            <Typography variant={"caption"}>
              <strong>Product Name</strong>
            </Typography>
            <Link to={`/product/${item.id}`}>
              <Typography>{item.name}</Typography>
            </Link>
          </div>

          <div className={classes.productDetailBox}>
            <div className={classes.subDetailBox}>
              <Typography variant={"caption"}>
                <strong>Quantity</strong>
              </Typography>
              <Typography>{item.quantity}</Typography>
            </div>

            <div className={classes.subDetailBox}>
              <Typography variant={"caption"}>
                <strong>Price</strong>
              </Typography>
              <Typography>{CurrencyFormatter(item.price)}</Typography>
            </div>

            <div className={classes.subDetailBox}>
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
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ borderBottom: "1px solid gray" }}
        >
          <div className={classes.header}>
            <Typography className={classes.heading}>
              <strong>Order ID:</strong> {history.id}
            </Typography>

            <Typography style={{ flex: 2 }}>
              <strong>Date:</strong> {formattedDate}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Typography>
                <strong>Total:</strong>
              </Typography>
              <Typography>{CurrencyFormatter(totalPrice)}</Typography>
            </div>
          </div>
        </ExpansionPanelSummary>
        {content}
      </ExpansionPanel>
    </div>
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
