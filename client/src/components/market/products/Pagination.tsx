import React from "react";
import MaterialUIPagination from "@material-ui/lab/Pagination";

const Pagination = ({ productsPerPage, totalProducts, paginate }: any) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  return <MaterialUIPagination count={pageCount} onChange={paginate} />;
};

export default Pagination;
