import React from "react";
import { NavLink } from "react-router-dom";
import { CREATE_ACCOUNT } from "../../../../path";
import { Button, Paper, useMediaQuery } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

// Icons
import EditIcon from "@material-ui/icons/Edit";

// Table Rows
const tableRows = (arr: number[], mediaQueryBreak: boolean) => {
  return arr.map((row: number, index: number) => (
    <tr
      key={index}
      className="hover:opacity-75"
      style={{ backgroundColor: "#1c223b" }}
    >
      {/* Details */}
      <td className={"rounded-l border-l-8 "} style={{ padding: 15 }}>
        <section className="flex flex-col text-gray-400">
          {/* Details */}
          <Skeleton
            animation="wave"
            width={mediaQueryBreak ? 400 : 140}
            height={20}
          />
          {/* Details End */}

          {/* Emmail */}
          <Skeleton
            animation="wave"
            width={mediaQueryBreak ? 250 : 140}
            height={30}
          />
          {/* Emmail End */}

          {/* Name */}
          <Skeleton
            animation="wave"
            width={mediaQueryBreak ? 250 : 140}
            height={30}
          />
          {/* Name End */}
        </section>
      </td>
      {/* Edit Button */}
      <td className="rounded-r text-center">
        <button>
          <EditIcon color="primary" />
        </button>
      </td>
      {/* Edit Button End */}
    </tr>
  ));
};

const UserControlPanelLandingLoading = () => {
  const minMediaQuery500 = useMediaQuery("(min-width:500px");
  const rows = tableRows([1, 2, 3, 4, 5], minMediaQuery500);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1c223b" }}>
      <div className="container mx-auto">
        <div className="py-8">
          <div className="flex flex-wrap mb-3">
            <NavLink to={CREATE_ACCOUNT} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary" className="mr-3">
                Create User
              </Button>
            </NavLink>
            <Button variant="outlined" color="secondary" className="mr-3">
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
                {/* Result */}
                <div className="mb-3">
                  <Skeleton
                    animation="wave"
                    width={minMediaQuery500 ? 100 : 80}
                    height={50}
                  />
                </div>
                {/* Result End */}
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
                  <tbody>{rows}</tbody>
                </table>
                {/* Table End */}
              </div>
              {/* Pagination */}
              <div className="flex justify-center p-3">
                <Skeleton
                  animation="wave"
                  width={minMediaQuery500 ? 90 : 60}
                  height={50}
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

export default UserControlPanelLandingLoading;
