import React from "react";

const AppFooter = () => {
  return (
    <div
      style={{
        marginTop: "10px",
        width: "100%",
        height: "20vh",
        display: "flex",
        backgroundColor: " rgba(184,184,184,.7)",
      }}
    >
      <div
        style={{
          border: "1px solid red",
          display: "flex",
        }}
      >
        ©2020 Michael Development
      </div>
    </div>
  );
};
export default AppFooter;
