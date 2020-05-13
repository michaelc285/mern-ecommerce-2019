import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SimpleExpansionPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Order ID: 1234564879
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Product Name . Price . Q*Price Quantity
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

export default SimpleExpansionPanel;
