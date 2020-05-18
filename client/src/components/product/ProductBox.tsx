import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CurrencyFormatter } from "../../utils/NumberFormatter";
import { addProductToCart } from "../../context/actions/CartAction";
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

interface IProductBox {
  image: string;
  title: string;
  desc: string;
  price: number;
  _id: string;
  addProductToCart(productId: string): any;
}

const ProductBox = ({
  _id,
  image,
  title,
  desc,
  price,
  addProductToCart,
}: IProductBox) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        href={`/product/${_id}`}
        className="text-decoration-none text-dark"
      >
        <CardMedia
          className={classes.img}
          image={image}
          title={`${title} - M's Market`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="h6">
            <strong>{CurrencyFormatter(price)}</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="outlined"
          href="#"
          onClick={() => addProductToCart(_id)}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

// Style
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
  },
  img: {
    height: "220px",
  },
}));

// Redux
const mapStateToProps = (state: any) => ({
  auth: state.auth,
  product: state.product,
  cart: state.cart,
});

export default connect(mapStateToProps, { addProductToCart })(ProductBox);
