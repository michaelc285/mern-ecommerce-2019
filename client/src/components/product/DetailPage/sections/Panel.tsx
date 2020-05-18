import React from "react";
import { connect } from "react-redux";
import { CurrencyFormatter } from "../../../../utils/NumberFormatter";
import { addProductToCart } from "../../../../context/actions/CartAction";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper, Button, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";

interface IPanel {
  product: any;
  isAuthenticated: boolean;
  addProductToCart(productId: string): void;
}

const Panel = ({ product, addProductToCart, isAuthenticated }: IPanel) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={4}>
      <div className={classes.infoGroup}>
        <div className={classes.priceBox}>
          <Typography>
            <strong>Price</strong> {CurrencyFormatter(product.price)}
          </Typography>
        </div>
        <div className={classes.descriptionBox}>
          <Typography>
            <strong>Dscription</strong>
          </Typography>
          <Typography>{product.description}</Typography>
        </div>
        <div className={classes.soldBox}>
          <Typography>
            <strong>Sold</strong> {product.sold}
          </Typography>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-column flex-md-row flex-xl-row">
        <Button
          startIcon={<AddShoppingCartIcon />}
          variant="outlined"
          size="large"
          onClick={() => addProductToCart(product._id)}
          className="mr-0 mr-md-3 mr-lg-3 mr-xl-3 mb-1 mb-md-0 mb-lg-0 mb-xl-0"
        >
          Add to Cart
        </Button>
        <Button
          startIcon={<PaymentIcon />}
          variant="outlined"
          size="large"
          disabled
        >
          Buy
        </Button>
      </div>
    </Paper>
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
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addProductToCart })(Panel);
