import React, { Fragment } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const Panel = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.infoGroup}>
        <div className={classes.priceBox}>
          {/* <Typography>
            <strong>Price</strong>
          </Typography> */}
          <Skeleton
            variant="text"
            animation="wave"
            className="ml-3"
            style={{ width: "150px" }}
          />
        </div>
        <div className={classes.descriptionBox}>
          {/* <Typography>
            <strong>Dscription</strong>
          </Typography> */}
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" style={{ width: "65%" }} />
        </div>
        <div className={classes.soldBox}>
          {/* <Typography>
            <strong>Sold</strong>
          </Typography> */}
          <Skeleton
            variant="text"
            animation="wave"
            style={{ width: "90px" }}
            className="ml-3"
          />
        </div>
        <div className={classes.buttonGroup}>
          <Skeleton
            variant="text"
            animation="wave"
            style={{ width: "140px", height: "68px" }}
            className="mr-2"
          />
          <Skeleton
            variant="text"
            animation="wave"
            style={{ width: "90px", height: "68px" }}
          />
        </div>
      </div>
    </Fragment>
  );
};

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: "400px",
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,

      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    infoGroup: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
    priceBox: {
      flex: 2,
      padding: "10px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgba(250,193,157,0.25)",
    },
    descriptionBox: {
      flex: 4,
      padding: "10px",
    },
    soldBox: {
      flex: 1,
      padding: "10px",
      display: "flex",
      alignItems: "center",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
    },
    addToCartButton: {
      marginRight: "10px",
    },
  })
);

export default Panel;
