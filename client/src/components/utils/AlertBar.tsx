import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { IAlertBar } from "../../types/interfaces";

const AlertBar = ({ msg }: IAlertBar) => {
  return (
    <div>
      <Alert severity="error">{`${msg.replace(/_/g, " ")}`}</Alert>
    </div>
  );
};

// Style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
      },
    },
  })
);

export default AlertBar;
