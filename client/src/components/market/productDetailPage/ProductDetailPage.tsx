import React, { useEffect, Fragment } from "react";
import { MARKET_LANDING } from "../../../path";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { getProductsById } from "../../../context/actions/ProductAction";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Container, Grid, Typography, Breadcrumbs } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Panel from "./sections/Panel";
import Display from "./sections/Display";
import { IProductDetailPage } from "../../../types/interfaces";

import DisplaySkeleton from "./sections/DisplaySkeleton";
import PanelSkeleton from "./sections/PanelSkeleton";

const ProductDetailPage = ({ match }: IProductDetailPage) => {
  const classes = useStyles();
  const productId = match.params.productID;
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProductsById(productId));
  }, [dispatch, productId]);

  // Components
  const Content = product.data && product.data.length > 0 && (
    <Fragment>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
        <NavLink to={MARKET_LANDING} className="text-decoration-none">
          Market
        </NavLink>
        <Typography color="textPrimary">{product.data[0].title}</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.typography} variant={"h6"}>
            {product.data[0].title}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Display product={product.data[0]} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Panel product={product.data[0]} />
        </Grid>
      </Grid>
    </Fragment>
  );

  const LoadingSkeleton = (
    <Fragment>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
        <NavLink to={MARKET_LANDING} className="text-decoration-none">
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
    <Container maxWidth="lg" className={classes.root}>
      {product && product.isLoading ? LoadingSkeleton : Content}
    </Container>
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

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

      minHeight: "100vh",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "20vh",
    },
    typography: {},
  })
);

export default ProductDetailPage;
