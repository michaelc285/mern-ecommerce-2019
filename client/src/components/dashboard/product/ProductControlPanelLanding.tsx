import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CREATE_PRODUCT } from "../../../path";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { RootState } from "../../../context/store";
import { getProducts } from "../../../context/actions/ProductAction";
import { DateFormatter } from "../../../utils/Formatter";
import ProductFilter from "../../market/filter/ProductFilter";
import { deleteProductById } from "../../../context/actions/ProductAction";
// Testing

// id, type, title, updatedAt

const ProductControlPanelLanding = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state: RootState) => state.productList
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const Rows =
    data &&
    data.map((row: any, index: number) => (
      <tr className={(index + 1) % 2 === 0 ? "bg-gray-200" : ""} key={row._id}>
        <td className="border px-3 py-2">{index + 1}</td>
        <td className="border px-3 py-2">{row._id}</td>
        <td className="border px-3 py-2">{row.title}</td>
        <td className="border px-3 py-2">{row.type}</td>
        <td className="border px-3 py-2">{DateFormatter(row.updatedAt)}</td>
        <td className="border px-3 py-2">{DateFormatter(row.createdAt)}</td>
        <td className="border px-3 py-2">
          <button
            className="text-blue-600"
            onClick={() => console.log(row._id)}
          >
            Edit
          </button>{" "}
          |{" "}
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
        <div className="flex flex-wrap py-3">
          <NavLink exact to={CREATE_PRODUCT}>
            <Button variant="outlined" color="primary" className="mr-3">
              Create Product
            </Button>
          </NavLink>
        </div>

        <ProductFilter />

        {/* Table */}
        <div className="overflow-x-auto">
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
            {isLoading ? null : <tbody>{Rows}</tbody>}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductControlPanelLanding;
