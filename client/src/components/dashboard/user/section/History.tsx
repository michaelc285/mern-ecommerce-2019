import React from "react";

// Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HistoryRow from "./HistoryRow";
import { IHistoryUserDetailsPage } from "../../../../types/interfaces";

const History = ({ data }: IHistoryUserDetailsPage) => {
  if (data === undefined || data.length <= 0) {
    return (
      <div className="h-32">
        <div className="h-full flex justify-center items-center text-gray-700 text-lg font-mono">
          <p>No History</p>
        </div>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Products Total</TableCell>
            <TableCell align="right">Delivery Fee </TableCell>
            <TableCell align="right">Bills Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => b.purchaseAt - a.purchaseAt)
            .map((record) => (
              <HistoryRow key={record.id} data={record} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default History;
