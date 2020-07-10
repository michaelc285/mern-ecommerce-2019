import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../../../../context/actions/ProductAction";
import { RootState } from "../../../../context/store";
import { LinearProgress, Breadcrumbs, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { PRODUCT_CONTROL_PANEL } from "../../../../path";

const ProductEditPage = ({ match }: any) => {
  const dispatch = useDispatch();
  const productID = match.params.productID;
  const { data, isLoading } = useSelector(
    (state: RootState) => state.productDetails
  );
  useEffect(() => {
    dispatch(getProductsById(productID));
  }, [dispatch, productID]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }
  console.log(data && data.images);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink
            exact
            to={PRODUCT_CONTROL_PANEL}
            className="text-black"
            style={{ textDecoration: "none" }}
          >
            Product Control Panel
          </NavLink>
          <Typography color="textPrimary">Product - {data.title}</Typography>
        </Breadcrumbs>
        {data.images !== undefined && (
          <div>
            <img src={`/${data.images[1]}`} alt={"bbg2000"} />
            <img src={`/${data.images[0]}`} alt={"bbg2000"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;

/**
 * Basic
 * Active switch
 * Delete Product
 * Edit image
 * edit inventory
 */
