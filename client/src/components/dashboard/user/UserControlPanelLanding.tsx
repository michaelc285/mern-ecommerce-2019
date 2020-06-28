import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../context/actions/AuthAction";
import { RootState } from "../../../context/store";
import { DateFormatter } from "../../../utils/Formatter";
import { NavLink } from "react-router-dom";
import { USER_CONTROL_PANEL, CREATE_ACCOUNT } from "../../../path";

// Components
import { Paper, LinearProgress, Button } from "@material-ui/core";
import Pagination from "../../market/products/Pagination";
// Icons
import EditIcon from "@material-ui/icons/Edit";

const UserControlPanelLanding = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.userList);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);

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
    <tr
      key={row._id}
      className="bg-gray-200 hover:bg-gray-200 hover:opacity-50 "
    >
      {/* Details */}
      <td
        className={`rounded-l-lg border-l-8 ${
          row.role ? "border-red-600" : "border-green-500"
        }`}
        style={{ padding: 15 }}
      >
        <div className="flex flex-col">
          <p className="font-light text-xs">
            <strong>ID:</strong> {row._id}{" "}
          </p>
          <p className="font-semibold text-xl">{row.name}</p>
        </div>
      </td>
      {/* Details End */}
      {/* Edit Button */}
      <td className="rounded-r-lg">
        <div className="px-1">
          <NavLink to={`${USER_CONTROL_PANEL}/${row._id}`} exact>
            <button>
              <EditIcon />
            </button>
          </NavLink>
        </div>
      </td>
      {/* Edit Button End */}
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
            <NavLink to={CREATE_ACCOUNT} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary" className="mr-3">
                Create User
              </Button>
            </NavLink>
          </div>

          {/* Content */}
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
                      <th className="px-3 py-2">ID</th>
                    </tr>
                  </thead>
                  <tbody>{Rows}</tbody>
                </table>
                {/* Table End */}
              </div>
              {/* Pagination */}
              <div className="flex justify-center my-10 p-3">
                <Pagination
                  productsPerPage={resultsPerPage}
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

export default UserControlPanelLanding;
