import React from "react";
import Product from "./Product";
import { Grid } from "@material-ui/core";

interface IProductsPerPage {
  products: object[];
}

const ProductsGridArea = ({ products }: IProductsPerPage) => {
  return (
    <div>
      <Grid container spacing={3}>
        {products.map((product: any) => (
          <Grid item md={4} sm={6} xs={12} key={product._id}>
            <Product
              _id={product._id}
              image={product.images[0]}
              title={product.title}
              price={product.price}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsGridArea;
