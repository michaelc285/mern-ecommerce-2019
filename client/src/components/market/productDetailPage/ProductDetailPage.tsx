import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { getProductsById } from "../../../context/actions/ProductAction";
import { NavLink } from "react-router-dom";
import { MARKET_LANDING } from "../../../path";
import { IProductDetailPage } from "../../../types/interfaces";

// Components
import {
  Typography,
  Breadcrumbs,
  Paper,
  LinearProgress,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Panel from "./sections/Panel";
import Display from "./sections/Display";
import DisplaySkeleton from "./sections/DisplaySkeleton";
import PanelSkeleton from "./sections/PanelSkeleton";

const ProductDetailPage = ({ match }: IProductDetailPage) => {
  const productId = match.params.productID;
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state: RootState) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductsById(productId));
  }, [dispatch, productId]);

  // Components
  const Content = (
    <div className="min-h-screen ">
      <div className="container mx-auto">
        <div className="py-6">
          <div className="mt-4 mb-6">
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink
                to={MARKET_LANDING}
                className="text-black"
                style={{ textDecoration: "none" }}
              >
                Market
              </NavLink>
              <Typography color="textPrimary">{data.title}</Typography>
            </Breadcrumbs>
          </div>
          {/*  Title */}
          <div className="mb-3">
            <h4 className="font-semibold text-2xl">{data.title}</h4>
          </div>
          {/* Carousel */}
          <div className="mb-3">
            <Paper elevation={2} className="p-6 mb-3">
              <Display product={data} />
            </Paper>
          </div>
          {/* Product description */}
          <div className="mb-3">
            <Paper elevation={2} className="p-6 mb-3">
              <Panel product={data} />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );

  const LoadingSkeleton = (
    <div className="min-h-screen">
      <LinearProgress color="secondary" />
      <div className="container mx-auto">
        <div className="py-6">
          <div className="mt-4 mb-6">
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink to={MARKET_LANDING} className="no-underline text-black">
                Market
              </NavLink>
              <Skeleton
                variant="text"
                animation="wave"
                style={{ width: "250px" }}
              />
            </Breadcrumbs>
          </div>
          {/* Title */}
          <div className="mb-3">
            <Skeleton
              variant="text"
              animation="wave"
              style={{ width: "250px" }}
            />
          </div>
          {/* Carousel */}
          <div className="mb-3">
            <Paper elevation={2} className="p-6 mb-3">
              <DisplaySkeleton />
            </Paper>
          </div>
          {/* product description */}
          <div className="mb-3">
            <Paper elevation={2} className="p-6 mb-3">
              <PanelSkeleton />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductNotFound = (
    <div className="h-screen w-screen ">
      <div className="h-full flex justify-center items-center">
        <div className="p-3">
          <h1 className="text-3xl sm:text-6xl font-extrabold font-mono">
            PRODUCT NOT FOUND
          </h1>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return LoadingSkeleton;
  }

  return (
    <Fragment>
      {Object.keys(data).length > 0 ? Content : ProductNotFound}
    </Fragment>
  );
};

export default ProductDetailPage;
