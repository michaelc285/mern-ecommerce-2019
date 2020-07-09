import React from "react";

const ProductEditPage = ({ match }: any) => {
  const prdouctID = match.params.productID;
  return <div>{prdouctID}</div>;
};

export default ProductEditPage;
