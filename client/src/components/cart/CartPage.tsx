import React, { useEffect } from "react";
import { RootState } from "../../context/store";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../../context/actions/CartAction";
import { MARKET_LANDING } from "../../path";
import { NavLink } from "react-router-dom";
//Components
import ProductsList from "./section/ProductsList";
import Bills from "./section/Bills";
import Payment from "./section/Payment";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Grid, Button, LinearProgress } from "@material-ui/core";

const CartPage = () => {
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

  const Nothing = (
    <div className="mt-56 mx-auto">
      <div className="flex flex-col items-center">
        <h4 className="text-3xl mb-5 font-mono">Nothing In Cart</h4>
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

  const Shopingcart = (
    <div className="container mx-auto">
      <div className="p-2 my-4">
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
      </div>
    </div>
  );

  if (cart.isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {cart.items && cart.items.length > 0 ? Shopingcart : Nothing}
    </div>
  );
};

export default CartPage;
