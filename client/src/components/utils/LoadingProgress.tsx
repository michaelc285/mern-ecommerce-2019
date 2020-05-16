import React from "react";
import { CircularProgress } from "@material-ui/core";

const LoadingProgress = () => {
  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingProgress;
