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
      <div className="flex-grow flex flex-col text-xl font-normal">
        <div className={classes.priceBox}>
          <span className="font-semibold mr-3">Price</span>{" "}
          {CurrencyFormatter(product.price)}
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
      <div className="flex justify-center">
        <div className="mr-3">
          <Button
            startIcon={<AddShoppingCartIcon />}
            variant="outlined"
            size="large"
            onClick={() => {
              isAuthenticated
                ? dispatch(addProductToCart(product._id))
                : history.push(SIGN_IN);
            }}
          >
            Add to Cart
          </Button>
        </div>
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
