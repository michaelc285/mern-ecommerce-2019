import React, { useState } from "react";
import ProductMenu from "../product/menu/ProductMenu";
import ProductsPerPage from "./section/ProductsPerPage";
import Pagination from "./section/Pagination";

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
      price: 40,
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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  // Get current product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ display: "flex" }}>
      {/* Menu */}
      <div style={{ flex: "2", height: "80vh" }}>
        <ProductMenu />
      </div>
      {/* Content */}

      <div
        style={{
          flex: "8",
          height: "80vh",
        }}
      >
        <span style={{ fontSize: "20px" }}>Result: {product.length}</span>
        <div style={{ marginTop: "1em" }}>
          {/* Products */}
          <ProductsPerPage products={currentProduct} loading={loading} />
          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "3em",
            }}
          >
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={product.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
