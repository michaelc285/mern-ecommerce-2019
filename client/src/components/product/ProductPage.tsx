import React, { useState, useEffect } from "react";
import ProductMenu from "./menu/ProductMenu";
import ProductsPerPage from "./section/ProductsPerPage";
import Pagination from "./section/Pagination";
import axios from "axios";
import { Typography } from "@material-ui/core";
const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  // Get current product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // API fetching products info
  const getProducts = async (body: object) => {
    const prods = await axios.post("/api/product/", body, {
      headers: {
        "content-type": "application/json",
      },
    });
    setProducts([...prods.data.products]);
    //setProducts([...products, ...prods.data.products]);
  };

  // Change page
  const paginate = (e: any, pageNumber: number) => setCurrentPage(pageNumber);

  //Handler
  const handleProductsSearch = (body: object) => getProducts(body);

  useEffect(() => {
    const body = {};

    getProducts(body);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "auto" }}>
      {/* Menu */}
      <div>
        <ProductMenu handleProductsSearch={handleProductsSearch} />
      </div>

      {/* Content */}
      <div>
        <Typography style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Result: {products.length}
        </Typography>
        <div>
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
              totalProducts={products.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
