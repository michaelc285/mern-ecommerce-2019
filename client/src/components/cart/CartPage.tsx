import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getProductsById } from "../../context/actions/ProductAction";
import { loadCart } from "../../context/actions/CartAction";
import { Container, Grid } from "@material-ui/core";
import Checkout from "./section/Checkout";
import ProductsList from "./section/ProductsList";

interface cartItem {
  id: string;
  quantity: number;
  date: number;
}

const CartPage = ({
  product,
  auth,
  cart,
  cartIsLoading,
  getProductsById,
  loadCart,
}: any) => {
  useEffect(() => {
    loadCart();
  }, [auth.isAuthenticated, loadCart]);

  // Components
  const load = <div>Load...</div>;

  const shoopingcart = (
    <Fragment>
      {/* Products List */}
      <Grid container spacing={2}>
        <Grid item xl={8} md={8} xs={12}>
          <ProductsList />
        </Grid>
        {/* Bill */}
        <Grid item xl={4} md={4} xs={12}>
          <Checkout />
        </Grid>
      </Grid>
    </Fragment>
  );

  return (
    <Fragment>
      <Container maxWidth="md">
        {cart && cartIsLoading ? load : shoopingcart}
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  product: state.product,
  cart: state.cart,
  cartIsLoading: state.cart.isLoading,
});

export default connect(mapStateToProps, { getProductsById, loadCart })(
  CartPage
);
