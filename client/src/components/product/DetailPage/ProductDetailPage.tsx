import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import Panel from "./sections/Panel";
import Display from "./sections/Display";
import { IProduct } from "../../../types/interfaces";

interface IProductDetailPage {
  match: any;
}

const Product = ({ match }: IProductDetailPage) => {
  const classes = useStyles();
  const ID = match.params.productID;
  const [product, setProduct] = useState<IProduct>({
    _id: "",
    title: "",
    type: "",
    price: 0,
    description: "",
    images: [],
    quantity: 0,
    sold: 0,
    createAt: "",
    updateAt: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      const data = await axios.get(`/api/product/?id=${ID}&type=single`);
      setProduct(data.data.product[0]);
    };
    getProduct();
  }, [ID]);

  return (
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

export default Product;
