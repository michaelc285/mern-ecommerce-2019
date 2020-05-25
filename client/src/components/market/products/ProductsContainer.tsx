import React from "react";
import ProductBox from "./Product";
import { Grid } from "@material-ui/core";

interface IProductsPerPage {
  products: object[];
}

const ProductsContainer = ({ products }: IProductsPerPage) => {
  return (
    <div style={{ minHeight: "80vh" }}>
      <Grid container spacing={3}>
        {products.map((product: any) => (
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12} key={product._id}>
            <ProductBox
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

export default ProductsContainer;
