import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CurrencyFormatter } from "../../utils/NumberFormatter";
import { addProductToCart } from "../../context/actions/CartAction";
import { Button, Typography, Link } from "@material-ui/core";
import { Card } from "react-bootstrap";
import PageviewIcon from "@material-ui/icons/Pageview";
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
    <Card>
      <a href={`/product/${_id}`} className="text-body text-decoration-none">
        <Card.Img
          variant="top"
          src={image}
          className={classes.img}
          alt={`${title} - M's Market`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{desc}</Card.Text>

          <Typography variant={"h6"}>
            <strong>{CurrencyFormatter(price)}</strong>
          </Typography>
        </Card.Body>
      </a>
      <Card.Footer className={"d-flex flex-column"}>
        <Button
          variant="outlined"
          href="#"
          onClick={() => addProductToCart(_id)}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};

// Style
const useStyles = makeStyles((theme: Theme) => ({
  img: {
    width: "100%",
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
