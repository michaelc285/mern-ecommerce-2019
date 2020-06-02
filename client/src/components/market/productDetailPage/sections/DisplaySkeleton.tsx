import React, { Fragment } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const Display = () => {
  return (
    <Fragment>
      <Skeleton
        variant="rect"
        width={"100%"}
        height={"40rem"}
        animation={"wave"}
      />
    </Fragment>
  );
};

export default Display;
