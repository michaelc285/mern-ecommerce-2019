import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getProductsById } from "../../../context/actions/ProductAction";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Panel from "./sections/Panel";
import Display from "./sections/Display";
import { IProduct } from "../../../types/interfaces";

interface IProductDetailPage {
  match: any;
  productIsLoading: boolean;
  product: IProduct;
  getProductsById(productId: string): void;
}

const productTemplate = {
  _id: "",
  title: "string",
  type: "",
  price: 0,
  description: "",
  images: [],
  quantity: 0,
  sold: 0,
  createAt: "",
  updateAt: "",
};

const ProductDetailPage = ({
  match,
  product = productTemplate,
  productIsLoading,
  getProductsById,
}: IProductDetailPage) => {
  const classes = useStyles();
  const productId = match.params.productID;

  useEffect(() => {
    getProductsById(productId);
  }, [productId, getProductsById]);

  // Components
  const LoadingComp = (
    <div
      style={{
        marginTop: "10rem",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <CircularProgress />
    </div>
  );

  const Content = (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.typography} variant={"h6"}>
            {product.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Display product={product} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Panel product={product} />
        </Grid>
      </Grid>
    </Container>
  );
  return (
    <Fragment>{product && productIsLoading ? LoadingComp : Content}</Fragment>
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
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "20vh",
    },
    typography: {},
  })
);

const mapStateToProps = (state: any) => ({
  productIsLoading: state.product.isLoading,
  product: state.product.data[0],
  cart: state.cart,
});

export default connect(mapStateToProps, { getProductsById })(ProductDetailPage);
