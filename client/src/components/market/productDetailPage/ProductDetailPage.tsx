import React, { useEffect, Fragment } from "react";
import { MARKET_LANDING } from "../../../path";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { getProductsById } from "../../../context/actions/ProductAction";
import { NavLink } from "react-router-dom";
import { Grid, Typography, Breadcrumbs } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Panel from "./sections/Panel";
import Display from "./sections/Display";
import { IProductDetailPage } from "../../../types/interfaces";
import DisplaySkeleton from "./sections/DisplaySkeleton";
import PanelSkeleton from "./sections/PanelSkeleton";

const ProductDetailPage = ({ match }: IProductDetailPage) => {
  const productId = match.params.productID;
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.productDetails);

  useEffect(() => {
    dispatch(getProductsById(productId));
  }, [dispatch, productId]);

  // Components
  const Content = product.data && (
    <Fragment>
      <Breadcrumbs aria-label="breadcrumb" className="mb-3">
        <NavLink to={MARKET_LANDING} className="no-underline text-black">
          Market
        </NavLink>
        <Typography color="textPrimary">{product.data.title}</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant={"h6"}>{product.data.title}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Display product={product.data} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Panel product={product.data} />
        </Grid>
      </Grid>
    </Fragment>
  );

  const LoadingSkeleton = (
    <Fragment>
      <Breadcrumbs aria-label="breadcrumb" className="mb-3">
        <NavLink to={MARKET_LANDING} className="no-underline text-black">
          Market
        </NavLink>
        <Skeleton variant="text" animation="wave" style={{ width: "250px" }} />
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Skeleton
            variant="text"
            animation="wave"
            style={{ width: "250px" }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <DisplaySkeleton />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PanelSkeleton />
        </Grid>
      </Grid>
    </Fragment>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="my-12">
          {product && product.isLoading ? LoadingSkeleton : Content}
        </div>
      </div>
    </div>
  );
};

// const productTemplate = {
//   _id: "",
//   title: "string",
//   type: "",
//   price: 0,
//   description: "",
//   images: [],
//   quantity: 0,
//   sold: 0,
//   createAt: "",
//   updateAt: "",
// };

export default ProductDetailPage;
