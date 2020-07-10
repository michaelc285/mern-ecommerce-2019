import React, { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { CREATE_PRODUCT, PRODUCT_CONTROL_PANEL } from "../../../path";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../context/store";
import { getProducts } from "../../../context/actions/ProductAction";
import { DateFormatter, CurrencyFormatter } from "../../../utils/Formatter";

// Componetns
import ProductFilter from "../../market/filter/ProductFilter";
import { Button, LinearProgress, Paper } from "@material-ui/core";
import Pagination from "../../market/products/Pagination";
import ProductControlPanelLandingLoading from "./section/ProductControlPanelLandingLoading";
import CustomDialog from "../../utils/CustomDialog";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import { IProduct } from "../../../types/interfaces";

// Table Rows
const tableRows = (products: IProduct[]) => {
  return products.map((row: IProduct, index: number) => (
    <tr
      key={row._id}
      className="hover:opacity-75"
      style={{ backgroundColor: "#1c223b" }}
    >
      {/* Details */}
      <td
        className={`rounded-l border-l-8 ${
          row.active ? "border-green-600" : "border-red-600"
        }`}
        style={{ padding: 15 }}
      >
        <section className="flex flex-col text-gray-400">
          <div className="font-light text-xs font-mono">
            <p className="pr-2 inline-block">
              <strong className="font-semibold">Id:</strong>{" "}
              <span className="text-orange-400">{row._id}</span>{" "}
            </p>
            <div className="hidden md:inline-block">
              {/* Last Update At */}
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Last Update:</strong>{" "}
                <span className="text-pink-600">
                  {DateFormatter(row.updatedAt)}
                </span>
              </p>
              {/* Create At */}
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Create At:</strong>{" "}
                <span className="text-pink-600">
                  {DateFormatter(row.createdAt)}
                </span>
              </p>
              {/* Type */}
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Type:</strong>{" "}
                <span className=" text-red-400">{row.type}</span>
              </p>
              {/* Sold */}
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Sold:</strong>{" "}
                <span className=" text-red-400">{row.sold}</span>
              </p>
              {/* Views */}
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Views:</strong>{" "}
                <span className=" text-red-400">{row.views}</span>
              </p>
              {/* Price */}
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Price:</strong>{" "}
                <span className=" text-red-400">
                  {CurrencyFormatter(row.price)}
                </span>
              </p>
              {/* Active */}
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Active:</strong>{" "}
                <span
                  className={`${
                    row.active ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {row.active ? "True" : "False"}
                </span>
              </p>
            </div>
          </div>
          <p className="font-semibold text-xl pt-1">
            <span>{row.title}</span>
          </p>
        </section>
      </td>
      {/* Details End */}
      {/* Edit Button */}
      <td className="rounded-r text-center">
        <NavLink exact to={`${PRODUCT_CONTROL_PANEL}/${row._id}`}>
          <button>
            <EditIcon color="primary" />
          </button>
        </NavLink>
      </td>
      {/* Edit Button End */}
    </tr>
  ));
};

const ProductControlPanelLanding = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state: RootState) => state.productList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleDialogIsOpen = () => setDialogIsOpen(true);
  const handleDialogIsClose = () => setDialogIsOpen(false);

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

  const Rows = useMemo(() => tableRows(currentProducts), [currentProducts]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
        <ProductControlPanelLandingLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1c223b" }}>
      <CustomDialog
        isOpen={dialogIsOpen}
        handleClose={handleDialogIsClose}
        title={"Product Filter"}
        children={<ProductFilter />}
      />
      <div className="container mx-auto">
        <div className="py-8">
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
            <Button
              variant="outlined"
              color="secondary"
              className="mr-3 "
              onClick={handleDialogIsOpen}
            >
              Filter
            </Button>
          </div>

          {/* Content */}
          <div className="mb-3">
            <Paper
              elevation={2}
              className="p-3"
              style={{ backgroundColor: "#273349" }}
            >
              <div className="overflow-x-auto">
                <div className="mb-3">
                  <h4 className="text-2xl text-white">
                    {resultCount > 1
                      ? `${resultCount} Results`
                      : `${resultCount} Result`}
                  </h4>
                </div>
                {/* Table */}
                <table
                  className="w-full"
                  style={{
                    borderSpacing: "0px 7px",
                    borderCollapse: "separate",
                  }}
                >
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-gray-200">Product</th>
                    </tr>
                  </thead>
                  <tbody>{Rows}</tbody>
                </table>
                {/* Table End */}
              </div>
              {/* Pagination */}
              <div className="flex justify-center p-3">
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={resultCount}
                  paginate={paginate}
                />
              </div>
              {/* Pagination End */}
            </Paper>
          </div>
          {/* Content End */}
        </div>
      </div>
    </div>
  );
};

export default ProductControlPanelLanding;
