import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../context/store";
import { CurrencyFormatter } from "../../../../utils/Formatter";
import { addProductToCart } from "../../../../context/actions/CartAction";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import { SIGN_IN } from "../../../../path";
import { IPanel } from "../../../../types/interfaces";

const Panel = ({ product }: IPanel) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Fragment>
      <div className={classes.infoGroup}>
        <div className={classes.priceBox}>
          <Typography>
            <strong>Price</strong> {CurrencyFormatter(product.price)}
          </Typography>
        </div>
        <div className={classes.descriptionBox}>
          <Typography>
            <strong>Description</strong>
          </Typography>
          <Typography>{textReducer(product.description)}</Typography>
        </div>
        <div className={classes.soldBox}>
          <Typography>
            <strong>Sold</strong> {product.sold}
          </Typography>
        </div>
      </div>
      <div className="flex justify-center ">
        <Button
          startIcon={<AddShoppingCartIcon />}
          variant="outlined"
          size="large"
          onClick={() => {
            isAuthenticated
              ? dispatch(addProductToCart(product._id))
              : history.push(SIGN_IN);
          }}
          className=" mr-2"
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
    </Fragment>
  );
};

const textReducer = (text: string) => {
  return text;
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

export default Panel;
