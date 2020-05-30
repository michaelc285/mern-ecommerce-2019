import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import ProductMenu from "./filter/ProductFilter";
import ProductsContainer from "./products/ProductsContainer";
import Pagination from "./products/Pagination";
import { getProducts } from "../../context/actions/ProductAction";
import LoadingProgres from "../utils/LoadingProgress";

const MarketLanding = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  let currentProducts = [];
  let resultCount = 0;
  if (products.data) {
    // Get current product
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    currentProducts = products.data.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    resultCount = products.data.length;
  }

  // Change page
  const paginate = (e: any, pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Component

  const NoResult = (
    <div className="h-64 flex justify-center items-center p-5 text-center">
      <h4 className="text-3xl">No relevant result was found</h4>
    </div>
  );

  const Content = (
    <div>
      <h4 className="text-xl p-2">
        {resultCount} {resultCount > 1 ? "Results" : "Result"}
      </h4>
      <div>
        {/* Products */}
        <ProductsContainer products={currentProducts} />

        {/* Pagination */}
        <div className="flex justify-center my-10 p-3">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={resultCount}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div>
          {/* Menu */}
          <div>
            <ProductMenu />
          </div>

          {/* Content */}
          {products && products.isLoading ? (
            <LoadingProgres />
          ) : products.data && products.data.length > 0 ? (
            Content
          ) : (
            NoResult
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketLanding;
