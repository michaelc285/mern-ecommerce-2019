import React from "react";

import { CircularProgress } from "@material-ui/core";
const LoadingProgress = () => {
  return (
    <div
      style={{
        marginTop: "10rem",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingProgress;
