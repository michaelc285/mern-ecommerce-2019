import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../context/actions/AuthAction";
import { RootState } from "../../../context/store";
import { DateFormatter } from "../../../utils/Formatter";
import { NavLink } from "react-router-dom";
import { USER_CONTROL_PANEL, CREATE_ACCOUNT } from "../../../path";

// Components
import { Paper, LinearProgress, Button } from "@material-ui/core";
import Pagination from "../../market/products/Pagination";
import UserControlPanelLandingLoading from "./section/UserControlPanelLandingLoading";
import CustomDialog from "../../utils/CustomDialog";
import UserFilter from "./section/UserFilter";
// Icons
import EditIcon from "@material-ui/icons/Edit";

// Table Rows
const tableRows = (users: any) => {
  return users.map((row: any, index: number) => (
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
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Reg:</strong>{" "}
                <span className="text-pink-600">
                  {DateFormatter(row.register_date)}
                </span>
              </p>
              <p className="pr-2 inline-block">
                <strong className="font-semibold">History:</strong>{" "}
                <span className=" text-red-400">{row.history.length}</span>
              </p>
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Cart:</strong>{" "}
                <span className=" text-red-400">{row.cart.length}</span>
              </p>
              <p className="pr-2 inline-block">
                <strong className="font-semibold">Role:</strong>{" "}
                <span
                  className={`${
                    row.role === 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {row.role ? "Admin" : "User"}
                </span>
              </p>
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
            <span>{row.email}</span>
          </p>
          <p className="font-semibold text-xl pt-1">
            <span>{row.name}</span>
          </p>
        </section>
      </td>
      {/* Details End */}
      {/* Edit Button */}
      <td className="rounded-r text-center">
        <NavLink to={`${USER_CONTROL_PANEL}/${row._id}`} exact>
          <button>
            <EditIcon color="primary" />
          </button>
        </NavLink>
      </td>
      {/* Edit Button End */}
    </tr>
  ));
};

const UserControlPanelLanding = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.userList);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);

  const handleDialogIsOpen = () => {
    setDialogIsOpen(true);
  };
  const handleDialogIsClose = () => {
    setDialogIsOpen(false);
  };

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

  const Rows = useMemo(() => tableRows(currentResults), [currentResults]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
        <UserControlPanelLandingLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1c223b" }}>
      <CustomDialog
        isOpen={dialogIsOpen}
        handleClose={handleDialogIsClose}
        title={"User Filter"}
        children={<UserFilter />}
      />
      <div className="container mx-auto">
        <div className="py-8">
          <div className="flex flex-wrap mb-3">
            <NavLink to={CREATE_ACCOUNT} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary" className="mr-3">
                Create User
              </Button>
            </NavLink>
            <Button
              variant="outlined"
              color="secondary"
              className="mr-3"
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
                      <th className="px-3 py-2 text-gray-200">User</th>
                    </tr>
                  </thead>
                  <tbody>{Rows}</tbody>
                </table>
                {/* Table End */}
              </div>
              {/* Pagination */}
              <div className="flex justify-center p-3">
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
