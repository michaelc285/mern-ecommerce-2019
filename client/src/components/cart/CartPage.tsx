import React, { useEffect, Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getProductsById } from "../../context/actions/ProductAction";
import { loadCart } from "../../context/actions/CartAction";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import Bills from "./section/Bills";
import ProductsList from "./section/ProductsList";
import Payment from "./section/Payment";
import { ICartPage } from "../../types/interfaces";
import LoadingProgress from "../utils/LoadingProgress";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const CartPage = ({
  authIsLoading,
  items,
  cartIsLoading,
  loadCart,
}: ICartPage) => {
  const classes = useStyles();

  useEffect(() => {
    loadCart();
  }, [authIsLoading, loadCart]);

  // Bills calulate
  let orderTotal: number = 0;
  let deliveryFee: number = 0;
  let totalPayment: number = 0;

  if (cartIsLoading === false && items && items.length > 0) {
    items.forEach((item) => {
      orderTotal += item.quantity * item.price;
    });
    if (orderTotal < 200) deliveryFee = 80;
    totalPayment = orderTotal + deliveryFee;
  }

  // Components

  const nothing = (
    <div
      style={{
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"h6"} gutterBottom={true}>
          Nothing in cart
        </Typography>
        <Button
          href="/market"
          variant="contained"
          color="primary"
          endIcon={<AddShoppingCartIcon />}
        >
          Shop now
        </Button>
      </div>
    </div>
  );

  const shoopingcart = (
    <Fragment>
      {/* Products List */}
      <Grid container spacing={3}>
        <Grid item xl={8} md={8} xs={12}>
          <ProductsList />
        </Grid>
        {/* Bill */}
        <Grid item xl={4} md={4} xs={12}>
          <Grid container direction={"column"} spacing={3}>
            <Grid item>
              <Bills
                orderTotal={orderTotal}
                deliveryFee={deliveryFee}
                totalPayment={totalPayment}
              />
            </Grid>
            <Grid item>
              <Payment totalPayment={totalPayment} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );

  return (
    <Fragment>
      <Container maxWidth="md" style={{ minHeight: "100vh" }}>
        {cartIsLoading ? (
          <LoadingProgress />
        ) : items && items.length > 0 ? (
          shoopingcart
        ) : (
          nothing
        )}
      </Container>
    </Fragment>
  );
};

// Style
const useStyles = makeStyles((theme: Theme) => ({
  loading: {},
}));

// Redux
const mapStateToProps = (state: any) => ({
  authIsLoading: state.auth.isAuthenticated,
  product: state.product,
  items: state.cart.items,
  cartIsLoading: state.cart.isLoading,
});

export default connect(mapStateToProps, { getProductsById, loadCart })(
  CartPage
);
