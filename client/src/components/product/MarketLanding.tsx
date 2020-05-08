import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProductMenu from "./menu/ProductFilter";
import ProductsContainer from "./section/ProductsContainer";
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
  }, [getProducts]);

  // Components
  const LoadingComp = (
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

  const Content = (
    <div>
      <Typography style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        Result {products.data.length}
      </Typography>
      <div>
        {/* Products */}
        <ProductsContainer products={currentProducts} />

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
  console.log();
  return (
    <div style={{ minHeight: "70vh" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "auto" }}>
        {/* Menu */}
        <div>
          <ProductMenu />
        </div>

        {/* Content */}
        {products && products.isLoading ? LoadingComp : Content}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  error: state.error,
  products: state.product,
});

export default connect(mapStateToProps, { getProducts })(MarketLanding);
