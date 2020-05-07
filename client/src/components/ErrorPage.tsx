import React, { Fragment } from "react";

const ErrorPage = () => {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          border: "1px solid red",
        }}
      >
        <h1>404 NOT FOUND</h1>
      </div>
    </Fragment>
  );
};

export default ErrorPage;
