import React from "react";
import ProductBox from "../ProductBox";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
const ProductsPerPage = ({ products, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={4} key={uuidv4()}>
          <ProductBox
            image={product.image}
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
