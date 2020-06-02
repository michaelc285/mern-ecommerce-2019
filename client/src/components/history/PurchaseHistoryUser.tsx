import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { NavLink } from "react-router-dom";
import { getUserHistory } from "../../context/actions/HistoryAction";
import HistoryContainer from "./section/HistoryContainer";
import { Typography, Breadcrumbs, Button } from "@material-ui/core";
import { MARKET_LANDING } from "../../path";
import LoadingProgress from "../utils/LoadingProgress";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import HistoryTable from "./section/HistoryTable";

const PurchaseHistoryUser = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.history);

  useEffect(() => {
    dispatch(getUserHistory());
  }, [dispatch]);

  console.log(data);

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
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="my-10">
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
          {isLoading ? (
            <LoadingProgress />
          ) : data.length > 0 ? (
            data
              .sort((a: any, b: any) => b.purchaseAt - a.purchaseAt)
              .map((item: any) => (
                <div key={item.id}>
                  <HistoryContainer data={item} />
                </div>
              ))
          ) : (
            NoHistory
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryUser;
