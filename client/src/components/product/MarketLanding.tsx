import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProductMenu from "./menu/ProductFilter";
import ProductsPerPage from "./section/ProductsPerPage";
import Pagination from "./section/Pagination";
import { Typography, CircularProgress } from "@material-ui/core";
import { getProducts } from "../../context/actions/ProductAction";

const MarketLanding = ({ getProducts, products }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  // Get current product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.data.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // Change page
  const paginate = (e: any, pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    getProducts();
  }, []);

  // Components
  const loadingComp = (
    <div
      style={{
        marginTop: "10rem",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <CircularProgress />
    </div>
  );

  const content = (
    <div>
      <Typography style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        Result {products.data.length}
      </Typography>
      <div>
        {/* Products */}
        <ProductsPerPage products={currentProducts} />

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
            totalProducts={products.data.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "70vh" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "auto" }}>
        {/* Menu */}
        <div>
          <ProductMenu />
        </div>

        {/* Content */}
        {products.isLoading ? loadingComp : content}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  error: state.error,
  products: state.product,
});

export default connect(mapStateToProps, { getProducts })(MarketLanding);
