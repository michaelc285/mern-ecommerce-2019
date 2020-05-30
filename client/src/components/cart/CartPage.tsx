import React, { useEffect, Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { RootState } from "../../context/store";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../../context/actions/CartAction";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import Bills from "./section/Bills";
import ProductsList from "./section/ProductsList";
import Payment from "./section/Payment";
import LoadingProgress from "../utils/LoadingProgress";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { MARKET_LANDING } from "../../path";
import { NavLink } from "react-router-dom";

const CartPage = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  // Bills calulate
  let orderTotal: number = 0;
  let deliveryFee: number = 0;
  let totalPayment: number = 0;

  if (cart.items && cart.items.length > 0) {
    cart.items.forEach((item: any) => {
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
        {cart.isLoading ? (
          <LoadingProgress />
        ) : cart.items && cart.items.length > 0 ? (
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

export default CartPage;
