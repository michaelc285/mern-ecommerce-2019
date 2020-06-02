import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import ProductFilter from "./filter/ProductFilter";
import ProductsGridArea from "./products/ProductsGridArea";
import Pagination from "./products/Pagination";
import { getProducts } from "../../context/actions/ProductAction";
import Skeleton from "@material-ui/lab/Skeleton";
import { Paper } from "@material-ui/core";
import SkeletonArea from "./products/SkeletonArea";

const MarketLanding = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state: RootState) => state.productList
  );
  const resultCount = data.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  //let currentProducts = [];
  // let resultCount = 0;

  // Get current product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

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
        {resultCount > 1 ? `${resultCount} Results` : `${resultCount} Result`}
      </h4>
      <div>
        {/* Products */}
        <div className="py-3 px-3">
          <ProductsGridArea products={currentProducts} />
        </div>

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

  const LoadingContent = (
    <div>
      <h4 className="text-xl p-2">
        <Skeleton variant="text" width="25%" />
      </h4>
      <div>
        {/* Products */}
        <div className="py-3 px-3 mb-6">
          <SkeletonArea NumberOfBox={productsPerPage} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="container mx-auto">
        <div className="mt-10">
          {/* Menu */}
          <div>
            <ProductFilter />
          </div>

          {/* Content */}
          <div className="mt-3">
            <Paper elevation={2}>
              {isLoading
                ? LoadingContent
                : data.length > 0
                ? Content
                : NoResult}
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLanding;
