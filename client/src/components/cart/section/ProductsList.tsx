import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { Grid, Paper } from "@material-ui/core";
import ProductContainer from "./ProductContainer";
import { ICartItemDetail } from "../../../types/interfaces";

const ProductsList = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const contentArr = cart.items.map((product: ICartItemDetail) => (
    <Grid item key={product._id}>
      <ProductContainer product={product} />
    </Grid>
  ));

  const content = (
    <Paper elevation={1}>
      <div className="bg-gray-400">
        <h6 className="font-semibold py-2 ml-2 uppercase">Product List</h6>
      </div>
      <Grid container spacing={1} direction={"column"}>
        {contentArr}
      </Grid>
    </Paper>
  );

  return <Fragment>{content}</Fragment>;
};

export default ProductsList;
