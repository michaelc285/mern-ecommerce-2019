import React, { Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import ProductContainer from "./ProductContainer";

import { ICartItemDetail } from "../../../types/interfaces";

const ProductsList = ({ cart }: any) => {
  const classes = useStyles();

  const contentArr = cart.items.map((product: ICartItemDetail) => (
    <Grid item key={product.id}>
      <ProductContainer product={product} />
    </Grid>
  ));

  const load = <div>Loading</div>;

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

  return <Fragment>{cart.items && cart.isLoading ? load : content}</Fragment>;
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

const mapStateToProps = (state: any) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, null)(ProductsList);
