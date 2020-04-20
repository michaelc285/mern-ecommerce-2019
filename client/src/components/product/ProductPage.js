import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { Pagination, PageItem } from "react-bootstrap";

import Product from "./ProductBox";
import ProductMenu from "./ProductMenu";

const ProductPage = () => {
  const [product, setProduct] = useState([
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 50,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
    {
      image: "https://www.w3schools.com/howto/img_forest.jpg",
      title: "Product",
      desc: "Description",
      price: 80,
    },
  ]);
  let active = 1;
  let items = [];

  for (let number = 1; number <= 2; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );

  // Display Products
  const displayProducts = product.map((product) => {
    return (
      <Grid item xs={4}>
        <Product
          image={product.image}
          title={product.title}
          desc={product.desc}
          price={product.price}
        />
      </Grid>
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "2", border: "1px solid red", height: "80vh" }}>
        <ProductMenu />
      </div>
      <div
        style={{
          flex: "8",
          border: "1px solid blue",
          height: "80vh",
          padding: "1em",
        }}
      >
        <div>
          <Grid container spacing={3}>
            {displayProducts}
          </Grid>
          {paginationBasic}
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
