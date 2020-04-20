import React, { Fragment } from "react";

const ProductMenu = () => {
  return (
    <Fragment>
      <ul>
        <li>
          <input type="text" placeholder="Search" />
        </li>
        <li>Category</li>
        <li>Rating Range Search</li>
        <li>Price Range</li>
      </ul>
    </Fragment>
  );
};

export default ProductMenu;
