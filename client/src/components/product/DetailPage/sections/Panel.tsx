import React from "react";
import { connect } from "react-redux";
import { addProductToCart } from "../../../../context/actions/CartAction";
import { IAuthReduxProps } from "../../../../types/interfaces";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
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
            <strong>Price</strong> $ {product.price}
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
      <div className={classes.buttonGroup}>
        <Button
          startIcon={<AddShoppingCartIcon />}
          variant="outlined"
          size="large"
          onClick={() => addProductToCart(product._id)}
          className={classes.addToCartButton}
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
      border: "1px solid red",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    infoGroup: {
      flexGrow: 1,
    },
    priceBox: {
      padding: "10px",
      marginBottom: "10px",
    },
    descriptionBox: {
      padding: "10px",
      minHeight: "200px",
      marginBottom: "10px",
    },
    soldBox: {
      padding: "10px",
      marginBottom: "10px",
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

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addProductToCart })(Panel);
