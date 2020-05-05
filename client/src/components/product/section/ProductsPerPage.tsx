import React from "react";
import ProductBox from "../ProductBox";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
const ProductsPerPage = ({ products, loading }: any) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
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
  );
};

export default ProductsPerPage;
