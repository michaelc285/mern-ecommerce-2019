import React from "react";

// Componetns

// Icons
import EditIcon from "@material-ui/icons/Edit";
import Skeleton from "@material-ui/lab/Skeleton";
import { useMediaQuery, Button, Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { CREATE_PRODUCT } from "../../../../path";

// Table Rows
const tableRows = (products: number[], mediaQueryBreak: boolean) => {
  return products.map((row: number, index: number) => (
    <tr
      key={index}
      className="hover:opacity-75"
      style={{ backgroundColor: "#1c223b" }}
    >
      {/* Details */}
      <td className={"rounded-l border-l-8"} style={{ padding: 15 }}>
        <section className="flex flex-col text-gray-400">
          {/* Product Details */}
          <Skeleton
            animation={"wave"}
            width={mediaQueryBreak ? 600 : 200}
            height={20}
          />
          {/* Product Details End */}
          {/* Product Title */}
          <Skeleton
            animation={"wave"}
            width={mediaQueryBreak ? 150 : 150}
            height={40}
          />
          {/* Product Title End */}
        </section>
      </td>
      {/* Details End */}
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

const ProductControlPanelLandingLoading = () => {
  let mediaQueryBreak = useMediaQuery("min-width:500px");
  let Rows = tableRows([1, 2, 3, 4, 5], mediaQueryBreak);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1c223b" }}>
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
            <Button variant="outlined" color="secondary" className="mr-3 ">
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
                <Skeleton animation="wave" width={120} height={50} />

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
                <Skeleton animation={"wave"} width={100} height={70} />
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

export default ProductControlPanelLandingLoading;
