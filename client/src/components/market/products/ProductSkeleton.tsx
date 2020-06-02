import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
} from "@material-ui/core";

const ProductSkeleton = () => {
  return (
    <Card>
      <CardActionArea>
        <Skeleton variant="rect" width="100%" height={220} animation="wave" />
        <CardContent>
          <Skeleton variant="text" height={30} animation="wave" />
          <Skeleton variant="text" width={40} animation="wave" />
        </CardContent>
      </CardActionArea>

      <CardActions>
        <div className="ml-1">
          <Skeleton
            variant="text"
            animation="wave"
            style={{ width: "170px", height: "68px" }}
          />
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductSkeleton;
