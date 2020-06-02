import React from "react";
import ProductSkeleton from "./ProductSkeleton";
import { Grid } from "@material-ui/core";

interface IProductsGridArea {
  NumberOfBox: number;
}

const ProductsGridArea = ({ NumberOfBox }: IProductsGridArea) => {
  let tempArr = [];

  for (let i = 0, n = NumberOfBox; i < n; i++) {
    const box = (
      <Grid item md={4} sm={6} xs={12} key={`product_skeleton_${i}`}>
        <ProductSkeleton />
      </Grid>
    );
    tempArr.push(box);
  }

  return (
    <div>
      <Grid container spacing={3}>
        {tempArr}
      </Grid>
    </div>
  );
};

export default ProductsGridArea;
