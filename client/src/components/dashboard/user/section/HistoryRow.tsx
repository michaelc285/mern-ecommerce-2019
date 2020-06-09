import React from "react";
import { DateFormatter, CurrencyFormatter } from "../../../../utils/Formatter";

// Interface
import { IHistoryRow } from "../../../../types/interfaces";

// Components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const HistoryRow = ({ data }: IHistoryRow) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let totalPrice = 0;
  data.history.forEach((product) => (totalPrice += product.price));
  const deliveryFee = totalPrice < 200 ? 80 : 0;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="flex-grow-1">
          {data.id}
        </TableCell>
        <TableCell align="right">{DateFormatter(data.purchaseAt)}</TableCell>
        <TableCell align="right">{CurrencyFormatter(totalPrice)}</TableCell>
        <TableCell align="right">{CurrencyFormatter(deliveryFee)}</TableCell>
        <TableCell align="right">
          {CurrencyFormatter(totalPrice + deliveryFee)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.history.map((historyRow) => (
                    <TableRow key={`${historyRow.orderID}_${historyRow.id}`}>
                      <TableCell component="th" scope="row">
                        {historyRow.id}
                      </TableCell>
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell align="right">{historyRow.quantity}</TableCell>
                      <TableCell align="right">
                        {Math.round(
                          historyRow.quantity * historyRow.price * 100
                        ) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default HistoryRow;
