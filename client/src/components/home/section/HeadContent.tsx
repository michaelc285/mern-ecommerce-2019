import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SIGN_IN, SIGN_UP } from "../../../path";
import marketImage from "../../../images/market.jpg";
const HeadContent = () => {
  return (
    <div
      className="w-full bg-top h-screen bg-cover bg-no-repeat select-none bg-opacity-50 relative "
      style={{ backgroundImage: `url(${marketImage})` }}
    >
      <div className="absolute right-0 mt-48 md:mt-64 mr-10 flex flex-col p-3">
        <h1 className="text-5xl md:text-6xl text-white font-sans font-extrabold">
          Michael's Market
        </h1>
        <div className="flex justify-start sm:justify-end mt-3">
          <NavLink exact to={SIGN_IN} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary" className="mr-1">
              SIGN IN
            </Button>
          </NavLink>
          <NavLink exact to={SIGN_UP} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              SIGN UP
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HeadContent;
