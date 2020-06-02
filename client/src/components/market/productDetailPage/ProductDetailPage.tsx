import React, { useEffect, Fragment } from "react";
import { MARKET_LANDING } from "../../../path";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { getProductsById } from "../../../context/actions/ProductAction";
import { NavLink } from "react-router-dom";
import { Typography, Breadcrumbs, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Panel from "./sections/Panel";
import Display from "./sections/Display";
import { IProductDetailPage } from "../../../types/interfaces";
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
        <Breadcrumbs aria-label="breadcrumb" className="my-3">
          <NavLink to={MARKET_LANDING} className="no-underline text-black">
            Market
          </NavLink>
          <Typography color="textPrimary">{data.title}</Typography>
        </Breadcrumbs>

        <div className="">
          <div className="">
            <Typography variant={"h6"}>{data.title}</Typography>
          </div>
          <div className="">
            <Paper elevation={2} className="p-6 mb-3">
              <Display product={data} />
            </Paper>
          </div>
          <div className="">
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
      <div className="container mx-auto">
        <Breadcrumbs aria-label="breadcrumb" className="my-3">
          <NavLink to={MARKET_LANDING} className="no-underline text-black">
            Market
          </NavLink>
          <Skeleton
            variant="text"
            animation="wave"
            style={{ width: "250px" }}
          />
        </Breadcrumbs>

        <div className="">
          <div className="">
            <Skeleton
              variant="text"
              animation="wave"
              style={{ width: "250px" }}
            />
          </div>
          <div className="">
            <Paper elevation={2} className="p-6 mb-3">
              <DisplaySkeleton />
            </Paper>
          </div>
          <div className="">
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

  return (
    <Fragment>
      {isLoading
        ? LoadingSkeleton
        : Object.keys(data).length > 0
        ? Content
        : ProductNotFound}
    </Fragment>
  );
};

export default ProductDetailPage;
