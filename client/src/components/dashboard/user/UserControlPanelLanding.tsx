import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../context/actions/AuthAction";
import { RootState } from "../../../context/store";
import { Paper, LinearProgress } from "@material-ui/core";
import Pagination from "../../market/products/Pagination";
import { DateFormatter } from "../../../utils/Formatter";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { USER_CONTROL_PANEL } from "../../../path";

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
      <td className="border px-3 py-2">
        <NavLink
          to={`${USER_CONTROL_PANEL}/${row._id}`}
          style={{ textDecoration: "none" }}
        >
          {row._id}
        </NavLink>
      </td>
      <td className="border px-3 py-2">{row.name}</td>
      <td className="border px-3 py-2">{row.role === 1 ? "Admin" : "User"}</td>
      <td className="border px-3 py-2">{row.email}</td>
      <td className="border px-3 py-2">{row.history.length}</td>
      <td className="border px-3 py-2">{row.cart.length}</td>
      <td className="border px-3 py-2">{DateFormatter(row.register_date)}</td>
    </tr>
  ));

  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="mt-8">
          <div className="flex flex-wrap mb-3">
            <NavLink to="/#" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary" className="mr-3 ">
                Create User
              </Button>
            </NavLink>
          </div>

          {/* Table */}
          <div className="mb-3">
            <Paper elevation={2} className="p-3">
              <div className="overflow-x-auto">
                <div className="mb-3">
                  <h4 className="text-2xl text-indigo-900">
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
                  <tbody>{Rows}</tbody>
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
    </div>
  );
};

export default UserControlPanelLanding;
