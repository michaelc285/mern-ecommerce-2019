import React, { useEffect, useMemo } from "react";
import { RootState } from "../../context/store";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../../context/actions/CartAction";
import { MARKET_LANDING } from "../../path";
import { NavLink } from "react-router-dom";
//Components
import ProductsList from "./section/ProductsList";
import Bills from "./section/Bills";
import Payment from "./section/Payment";
import ShippingInfo from "./section/ShippingInfo";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Grid, Button, LinearProgress } from "@material-ui/core";

const billsCalculate = (items: any) => {
  let orderTotal: number = 0;
  let deliveryFee: number = 80;
  let totalPayment: number = 0;
  if (items.length > 0) {
    items.forEach((item: any) => {
      orderTotal += item.quantity * item.price;
    });
    if (orderTotal >= 200) deliveryFee = 0;
    totalPayment = orderTotal + deliveryFee;

    return {
      orderTotal,
      deliveryFee,
      totalPayment,
    };
  } else {
    return {
      orderTotal,
      deliveryFee,
      totalPayment,
    };
  }
};

const CartPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const bills = useMemo(() => billsCalculate(cart.items), [cart.items]);

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
          <Grid item xs={12} lg={8}>
            <ProductsList />
          </Grid>
          {/* Bill */}
          <Grid item xs={12} lg={4}>
            <Grid container direction={"column"} spacing={3}>
              <Grid item>
                <Bills
                  orderTotal={bills.orderTotal}
                  deliveryFee={bills.deliveryFee}
                  totalPayment={bills.totalPayment}
                />
              </Grid>
              <Grid item>
                <ShippingInfo contactDetails={user.contactDetails} />
              </Grid>
              <Grid item>
                <Payment totalPayment={bills.totalPayment} />
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
