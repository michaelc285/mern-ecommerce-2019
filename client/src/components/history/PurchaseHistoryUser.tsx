import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserHistory } from "../../context/actions/HistoryAction";
import HistoryContainer from "./section/HistoryContainer";
import { IPurchaseHistoryUser } from "../../types/interfaces";

const PurchaseHistoryUser = ({
  getUserHistory,
  history,
}: IPurchaseHistoryUser) => {
  useEffect(() => {
    getUserHistory();
  }, []);

  useEffect(() => {
    if (history && history.isLoading) {
    }
  }, [history]);
  console.log(history.data);
  return (
    <div>
      <HistoryContainer />
    </div>
  );
};

// Redux
const mapStateToProps = (state: any) => ({
  history: state.history,
});
export default connect(mapStateToProps, { getUserHistory })(
  PurchaseHistoryUser
);
