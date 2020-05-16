import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserHistory } from "../../context/actions/HistoryAction";
import HistoryContainer from "./section/HistoryContainer";
import { IPurchaseHistoryUser } from "../../types/interfaces";
import { Typography, Container } from "@material-ui/core";

const PurchaseHistoryUser = ({
  getUserHistory,
  history,
}: IPurchaseHistoryUser) => {
  useEffect(() => {
    getUserHistory();
  }, [getUserHistory]);

  const content =
    history &&
    history.data &&
    history.data
      .sort((a, b) => b.purchaseAt - a.purchaseAt)
      .map((item) => <HistoryContainer key={item.id} history={item} />);

  const nothing = <Typography> No History </Typography>;

  return (
    <Container maxWidth="lg" style={{ minHeight: "100vh" }}>
      {history && history.data && history.data.length > 0 ? content : nothing}
    </Container>
  );
};

// Redux
const mapStateToProps = (state: any) => ({
  history: state.history,
});
export default connect(mapStateToProps, { getUserHistory })(
  PurchaseHistoryUser
);
