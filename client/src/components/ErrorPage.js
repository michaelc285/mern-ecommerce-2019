import React from "react";

const ErrorPage = () => {
  return (
    <div
      style={{
        height: "50vh",
        border: "1px solid red",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>404 NOT FOUND</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
