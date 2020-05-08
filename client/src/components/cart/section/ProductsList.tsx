import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Paper, CssBaseline } from "@material-ui/core";
import ProductContainer from "./ProductContainer";

const ProductsList = ({ cart, cartIsLoading }: any) => {
  const load = <div>Loading</div>;

  return (
    <Fragment>
      <CssBaseline />
      <Paper elevation={7} style={{ minHeight: "50vh" }}>
        {cartIsLoading && cart ? load : <ProductContainer />}
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  cart: state.cart,
  cartIsLoading: state.cart.isLoading,
});

export default connect(mapStateToProps, null)(ProductsList);
