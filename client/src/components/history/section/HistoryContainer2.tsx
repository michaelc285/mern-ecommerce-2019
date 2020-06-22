import React, { useState } from "react";
import { DateFormatter } from "../../../utils/Formatter";
import { NavLink } from "react-router-dom";

// Components
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  makeStyles,
} from "@material-ui/core";
// Icons
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const HistoryContainer2 = React.memo(({ row }: any) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const {
    addressLine1,
    addressLine2,
    townOrCity,
    postalCode,
    phone,
  } = row.contactDetails;

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
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{DateFormatter(row.purchaseAt)}</TableCell>
        <TableCell align="right">{row.bills.orderTotal}</TableCell>
        <TableCell align="right">{row.bills.deliveryFee}</TableCell>
        <TableCell align="right">
          <p className="text-green-600 font-semibold">
            {row.bills.totalPayment}
          </p>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* Address */}
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Shipping Details
              </Typography>
              <div className=" md:pl-4">
                <p className="font-hairline mb-2">
                  <span className="font-semibold py-1">Address : </span>
                  <br />
                  {`${addressLine1}, ${addressLine2}, ${townOrCity}, ${postalCode}`}
                </p>
                <p className="font-hairline">
                  <span className="font-semibold py-1">Contact Number : </span>
                  <br />
                  {`${phone}`}
                </p>
              </div>
            </Box>
            {/* Address End */}

            {/* Products List */}
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="font-semibold">ID</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold">Name</p>
                    </TableCell>
                    <TableCell align="right">
                      <p className="font-semibold">Amount</p>
                    </TableCell>
                    <TableCell align="right">
                      <p className="font-semibold">Price ($)</p>
                    </TableCell>
                    <TableCell align="right">
                      <p className="font-semibold">Total price ($)</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow: any) => (
                    <TableRow key={`${historyRow.id}_${historyRow.orderID}`}>
                      <TableCell component="th" scope="row">
                        <NavLink
                          exact
                          to={`/product/${historyRow.id}`}
                          className="text-blue-400 hover:text-blue-700"
                          style={{ textDecoration: "none" }}
                        >
                          {historyRow.id}
                        </NavLink>
                      </TableCell>
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell align="right">{historyRow.quantity}</TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
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
            {/* Products List End */}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
});

export default HistoryContainer2;
