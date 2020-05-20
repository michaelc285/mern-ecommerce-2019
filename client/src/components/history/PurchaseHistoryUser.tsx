import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserHistory } from "../../context/actions/HistoryAction";
import HistoryContainer from "./section/HistoryContainer";
import { IPurchaseHistoryUser } from "../../types/interfaces";
import { Typography, Container, Breadcrumbs } from "@material-ui/core";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { MARKET_LANDING } from "../../context/path";
const PurchaseHistoryUser = ({
  getUserHistory,
  history,
}: IPurchaseHistoryUser) => {
  const classes = useStyles();

  useEffect(() => {
    getUserHistory();
  }, [getUserHistory]);

  const Content =
    history &&
    history.data &&
    history.data
      .sort((a, b) => b.purchaseAt - a.purchaseAt)
      .map((item) => <HistoryContainer key={item.id} history={item} />);

  const NoHistory = (
    <div className={classes.noHistory}>
      <Typography variant={"h6"}> No history found</Typography>
    </div>
  );

  return (
    <Container maxWidth="lg" style={{ minHeight: "100vh" }}>
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
      {history && history.data && history.data.length > 0 ? Content : NoHistory}
    </Container>
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

// Redux
const mapStateToProps = (state: any) => ({
  history: state.history,
});
export default connect(mapStateToProps, { getUserHistory })(
  PurchaseHistoryUser
);
