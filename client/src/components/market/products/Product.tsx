import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { CurrencyFormatter } from "../../../utils/Formatter";
import { addProductToCart } from "../../../context/actions/CartAction";
import { useHistory, NavLink } from "react-router-dom";
import { SIGN_UP } from "../../../path";
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
  description?: string;
  price: number;
  _id: string;
}

const ProductBox = ({ _id, image, title, price }: IProductBox) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Card>
      <NavLink
        to={`/product/${_id}`}
        className="text-decoration-none text-dark "
      >
        <CardActionArea>
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
      </NavLink>
      <CardActions>
        <Button
          variant="outlined"
          href="#"
          onClick={() => {
            isAuthenticated
              ? dispatch(addProductToCart(_id))
              : history.push(SIGN_UP);
          }}
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
  img: {
    height: "220px",
  },
}));

export default ProductBox;
