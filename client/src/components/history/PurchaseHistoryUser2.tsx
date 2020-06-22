import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MARKET_LANDING } from "../../path";
import { RootState } from "../../context/store";
import { getUserHistory } from "../../context/actions/HistoryAction";

// Components
import {
  LinearProgress,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Breadcrumbs,
  Typography,
  Button,
} from "@material-ui/core";
import HistoryContainer2 from "./section/HistoryContainer2";

// Icons
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const PurchaseHistoryUser2 = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.history);

  useEffect(() => {
    dispatch(getUserHistory());
  }, [dispatch]);

  // When History data Loading
  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }

  // If do not have any purchase history
  if (data.length <= 0) {
    return (
      <div className="h-screen">
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-mono mb-3"> No History Found</h1>
          <NavLink to={MARKET_LANDING}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddShoppingCartIcon />}
            >
              Shop now
            </Button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="py-3">
          <div className="py-3">
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink
                to={MARKET_LANDING}
                className="text-decoration-none text-secondary"
              >
                Market
              </NavLink>
              <Typography color="textPrimary">History</Typography>
            </Breadcrumbs>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <p className="font-semibold">Order Number</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold">Date</p>
                  </TableCell>
                  <TableCell align="right">
                    <p className="font-semibold">Price ($)</p>
                  </TableCell>
                  <TableCell align="right">
                    <p className="font-semibold">Delivery Fee ($)</p>
                  </TableCell>
                  <TableCell align="right">
                    <p className="text-green-700 font-semibold">
                      Total Price ($)
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .sort((a: any, b: any) => b.purchaseAt - a.purchaseAt)
                  .map((row: any) => (
                    <HistoryContainer2 row={row} key={row.id} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryUser2;
