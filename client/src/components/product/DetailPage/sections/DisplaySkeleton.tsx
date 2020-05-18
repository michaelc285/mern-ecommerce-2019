import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const Display = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={4}>
      <Skeleton
        variant="rect"
        width={"100%"}
        height={"370px"}
        animation={"wave"}
      />
    </Paper>
  );
};

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: "400px",
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    img: {
      maxHeight: "370px",
    },
  })
);

export default Display;
