import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { NavLink } from "react-router-dom";
import { getUserHistory } from "../../context/actions/HistoryAction";
import HistoryContainer from "./section/HistoryContainer";
import { Typography, Breadcrumbs } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { MARKET_LANDING } from "../../path";
import LoadingProgress from "../utils/LoadingProgress";

const PurchaseHistoryUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.history);

  useEffect(() => {
    dispatch(getUserHistory());
  }, [dispatch]);

  const Content =
    history &&
    history.data &&
    history.data
      .sort((a: any, b: any) => b.purchaseAt - a.purchaseAt)
      .map((item: any) => <HistoryContainer key={item.id} history={item} />);

  const NoHistory = (
    <div className={classes.noHistory}>
      <Typography variant={"h6"}> No history found</Typography>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="mt-10">
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
          {history.isLoading ? (
            <LoadingProgress />
          ) : history.data && history.data.length > 0 ? (
            Content
          ) : (
            NoHistory
          )}
        </div>
      </div>
    </div>
  );
};

// Style
const useStyles = makeStyles((theme: Theme) => ({
  noHistory: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
}));

export default PurchaseHistoryUser;
