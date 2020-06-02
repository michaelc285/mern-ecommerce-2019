import React from "react";
import marketImage from "../../../images/market.jpg";
import { Button } from "@material-ui/core";
const HeadContent = () => {
  return (
    <div
      className="w-full bg-top h-screen bg-cover bg-no-repeat  select-none bg-opacity-50 relative "
      style={{ backgroundImage: `url(${marketImage})` }}
    >
      <div className="absolute mt-64 ml-32">
        <h1 className="text-4xl md:text-6xl text-white font-sans font-extrabold">
          Michael's Market
        </h1>
        <Button variant="contained" color="secondary" className="mr-3">
          SIGN UP
        </Button>
        <Button variant="contained" color="secondary">
          SIGN IN
        </Button>
      </div>
    </div>
  );
};

export default HeadContent;
