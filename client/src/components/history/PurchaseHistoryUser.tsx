import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { NavLink } from "react-router-dom";
import { getUserHistory } from "../../context/actions/HistoryAction";
import { MARKET_LANDING } from "../../path";

// Components
import {
  Typography,
  Breadcrumbs,
  Button,
  LinearProgress,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import HistoryContainer from "./section/HistoryContainer";
import HistoryContainer2 from "./section/HistoryContainer2";
// import HistoryTable from "./section/HistoryTable";

const PurchaseHistoryUser = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.history);

  useEffect(() => {
    dispatch(getUserHistory());
  }, [dispatch]);

  const NoHistory = (
    <div className="h-64">
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

  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="py-10">
          <div className="mb-3">
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
          {/* History Container */}
          {data.length > 0
            ? data
                .sort((a: any, b: any) => b.purchaseAt - a.purchaseAt)
                .map((row: any) => (
                  <div key={row.id}>
                    <HistoryContainer2 data={row} />
                  </div>
                ))
            : NoHistory}
          {/* History Container end */}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryUser;
