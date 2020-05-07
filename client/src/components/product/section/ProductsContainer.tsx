import React from "react";
import ProductBox from "../ProductBox";
import { Grid } from "@material-ui/core";

interface IProductsPerPage {
  products: object[];
}

const ProductsContainer = ({ products }: IProductsPerPage) => {
  return (
    <div style={{ minHeight: "50vh" }}>
      <Grid container spacing={3}>
        {products.map((product: any) => (
          <Grid item xs={12} sm={3} key={product._id}>
            <ProductBox
              _id={product._id}
              image={product.images[0]}
              title={product.title}
              desc={product.desc}
              price={product.price}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsContainer;
