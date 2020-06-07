import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CREATE_PRODUCT } from "../../../path";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { RootState } from "../../../context/store";
import { getProducts } from "../../../context/actions/ProductAction";
import { DateFormatter } from "../../../utils/Formatter";
import ProductFilter from "../../market/filter/ProductFilter";
import { deleteProductById } from "../../../context/actions/ProductAction";
import { Paper } from "@material-ui/core";
import Pagination from "../../market/products/Pagination";
// Testing

// id, type, title, updatedAt

const ProductControlPanelLanding = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state: RootState) => state.productList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Get current product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const resultCount = data.length;
  // Change page
  const paginate = (e: any, pageNumber: number) => setCurrentPage(pageNumber);

  const Rows = currentProducts.map((row: any, index: number) => (
    <tr className={(index + 1) % 2 === 0 ? "bg-gray-200" : ""} key={row._id}>
      <td className="border px-3 py-2">{indexOfFirstProduct + index + 1}</td>
      <td className="border px-3 py-2">{row._id}</td>
      <td className="border px-3 py-2">{row.title}</td>
      <td className="border px-3 py-2">{row.type}</td>
      <td className="border px-3 py-2">{DateFormatter(row.updatedAt)}</td>
      <td className="border px-3 py-2">{DateFormatter(row.createdAt)}</td>
      <td className="border px-3 py-2">
        <button className="text-blue-600" onClick={() => console.log(row._id)}>
          Edit
        </button>
        <span>{" | "}</span>
        <button
          className="text-blue-600"
          onClick={() => dispatch(deleteProductById(row._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="mt-8">
          <div className="flex flex-wrap mb-3">
            <NavLink
              exact
              to={CREATE_PRODUCT}
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined" color="secondary" className="mr-3 ">
                Create Product
              </Button>
            </NavLink>
          </div>
          <div className="mb-3">
            <ProductFilter />
          </div>

          {/* Table */}
          <div className="mb-3">
            <Paper elevation={2} className="p-3">
              <div className="overflow-x-auto">
                <div className="mb-3">
                  <h4 className="text-2xl">
                    {resultCount > 1
                      ? `${resultCount} Results`
                      : `${resultCount} Result`}
                  </h4>
                </div>

                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-3 py-2">Index</th>
                      <th className="px-3 py-2">Product ID</th>
                      <th className="px-3 py-2">Title</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Updated At</th>
                      <th className="px-3 py-2">Created At</th>
                      <th className="px-3 py-2">Options</th>
                    </tr>
                  </thead>
                  {!isLoading && <tbody>{Rows}</tbody>}
                </table>
              </div>
              <div className="flex justify-center my-10 p-3">
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={resultCount}
                  paginate={paginate}
                />
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductControlPanelLanding;
