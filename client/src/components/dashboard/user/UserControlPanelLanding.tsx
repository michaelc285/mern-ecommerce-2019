import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../context/actions/AuthAction";
import { RootState } from "../../../context/store";
import { Paper } from "@material-ui/core";
import Pagination from "../../market/products/Pagination";
import { DateFormatter } from "../../../utils/Formatter";

const UserControlPanelLanding = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.userList);

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Get current product
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  let currentResults = data.slice(indexOfFirstResult, indexOfLastResult);
  const resultCount = data.length;
  // Change page
  const paginate = (e: any, pageNumber: number) => setCurrentPage(pageNumber);

  const Rows = currentResults.map((row: any, index: number) => (
    <tr className={(index + 1) % 2 === 0 ? "bg-gray-200" : ""} key={row._id}>
      <td className="border px-3 py-2">{indexOfFirstResult + index + 1}</td>
      <td className="border px-3 py-2">{row._id}</td>
      <td className="border px-3 py-2">{row.name}</td>
      <td className="border px-3 py-2">{row.role}</td>
      <td className="border px-3 py-2">{row.email}</td>
      <td className="border px-3 py-2">{row.history.length}</td>
      <td className="border px-3 py-2">{row.cart.length}</td>
      <td className="border px-3 py-2">{DateFormatter(row.register_date)}</td>
      <td className="border px-3 py-2">
        <button className="text-blue-600" onClick={() => console.log(row._id)}>
          Edit
        </button>
        <span>{" | "}</span>
        <button className="text-blue-600" onClick={() => console.log(row._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto" style={{ border: "1px solid red" }}>
        <div className="flex">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            UserControlPanelLanding
          </button>
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
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">History</th>
                    <th className="px-3 py-2">Cart</th>
                    <th className="px-3 py-2">Reg. Date</th>
                  </tr>
                </thead>
                {!isLoading && <tbody>{Rows}</tbody>}
              </table>
            </div>
            <div className="flex justify-center my-10 p-3">
              <Pagination
                productsPerPage={resultsPerPage}
                totalProducts={resultCount}
                paginate={paginate}
              />
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default UserControlPanelLanding;
