import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
interface IPanel {
  product: any;
}

const Panel = ({ product }: IPanel) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item xs={12} className={classes.gridItem}>
          <Typography>$ {product.price}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography>Dscription</Typography>
          <Typography>{product.description}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography>Sold</Typography>
          <Typography>{product.sold}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.buttonGroup}>
          <Button
            startIcon={<AddShoppingCartIcon />}
            variant="outlined"
            size="large"
          >
            Add to Cart
          </Button>
          <Button startIcon={<PaymentIcon />} variant="outlined" size="large">
            Buy
          </Button>
        </Grid>
      </Grid>
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
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    gridItem: {
      width: "100%",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
    },
  })
);
export default Panel;
