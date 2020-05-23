import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import ProductContainer from "./ProductContainer";
import { ICartItemDetail } from "../../../types/interfaces";

const ProductsList = () => {
  const classes = useStyles();

  const cart = useSelector((state: RootState) => state.cart);

  const contentArr = cart.items.map((product: ICartItemDetail) => (
    <Grid item key={product.id}>
      <ProductContainer product={product} />
    </Grid>
  ));

  const content = (
    <Paper elevation={7}>
      <div className={classes.boxTitle}>
        <Typography className={classes.textMargin} variant={"h6"}>
          Product List
        </Typography>
      </div>
      <Grid container spacing={1} direction={"column"}>
        {contentArr}
      </Grid>
    </Paper>
  );

  return <Fragment>{content}</Fragment>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "5vh",
  },
  boxTitle: {
    padding: "3px",
    marginBottom: "6px",
    backgroundColor: "rgb(180, 180, 180)",
  },
  textMargin: {
    marginLeft: "10px",
  },
}));

export default ProductsList;
