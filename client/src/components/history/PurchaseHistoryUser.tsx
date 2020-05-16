import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserHistory } from "../../context/actions/HistoryAction";
import HistoryContainer from "./section/HistoryContainer";
import { IPurchaseHistoryUser } from "../../types/interfaces";
import { Typography, Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

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
