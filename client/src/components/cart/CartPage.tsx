import React, { useEffect, useMemo } from "react";
import { RootState } from "../../context/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  cleanBuyProcessState,
} from "../../context/actions/CartAction";
import { MARKET_LANDING, USER_HISTORY } from "../../path";
import { NavLink } from "react-router-dom";
//Components
import ProductsList from "./section/ProductsList";
import Bills from "./section/Bills";
import Payment from "./section/Payment";
import ShippingInfo from "./section/ShippingInfo";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  Grid,
  Button,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";

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
  const {
    isLoading: buyProcessIsLoading,
    success: buyProcessIsSuccess,
  } = useSelector((state: RootState) => state.buyProcess);

  useEffect(() => {
    dispatch(loadCart());
    return () => {
      dispatch(cleanBuyProcessState());
    };
  }, [dispatch]);

  const bills = useMemo(() => billsCalculate(cart.items), [cart.items]);

  // Components

  if (cart.isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }

  if (buyProcessIsSuccess) {
    return (
      <div className="h-screen">
        <div className="h-full flex flex-col justify-center items-center bg-white">
          <h6 className="text-4xl font-mono font-semibold text-green-600 uppercase mb-5">
            Success
          </h6>
          <div className="flex flex-col md:flex-row">
            <NavLink exact to={MARKET_LANDING}>
              <button className="rounded no-underline text-white hover:text-white p-2 bg-blue-500 hover:bg-blue-600 uppercase mb-1 md:mr-2 md:mb-0">
                Go to Market
              </button>
            </NavLink>
            <NavLink exact to={USER_HISTORY}>
              <button className="rounded no-underline text-white  hover:text-white p-2 bg-blue-500 hover:bg-blue-600 uppercase">
                Go to History
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items && cart.items.length > 0) {
    return (
      <div className="min-h-screen relative">
        {buyProcessIsLoading && (
          <div className="h-full w-full z-10 absolute flex justify-center items-center bg-white opacity-75">
            <CircularProgress color="primary" />
          </div>
        )}
        <div className="container mx-auto">
          <div className="py-4">
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
                    <Payment bills={bills} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="mt-56 mx-auto">
        <div className="flex flex-col items-center">
          <h4 className="text-3xl mb-5 font-mono">Nothing In Cart</h4>
          <NavLink to={MARKET_LANDING}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddShoppingCartIcon />}
              style={{ textDecoration: "none" }}
            >
              Shop now
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
