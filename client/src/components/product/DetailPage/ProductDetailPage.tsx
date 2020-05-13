import React, { useEffect, Fragment, useState } from "react";
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
  product: any;
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
  product,
  getProductsById,
}: IProductDetailPage) => {
  const classes = useStyles();
  const productId = match.params.productID;
  const [productData, setProductData] = useState<IProduct>(productTemplate);

  useEffect(() => {
    getProductsById(productId);
  }, [productId, getProductsById]);

  useEffect(() => {
    if (product && product.data && product.data.length > 0) {
      setProductData(product.data[0]);
      console.log(product.data[0]);
    }
  }, [product]);

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
            {productData.title}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Display product={productData} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Panel product={productData} />
        </Grid>
      </Grid>
    </Container>
  );
  return (
    <Fragment>{product && product.isLoading ? LoadingComp : Content}</Fragment>
  );
};

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "100vh",
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
  product: state.product,
});

export default connect(mapStateToProps, { getProductsById })(ProductDetailPage);
