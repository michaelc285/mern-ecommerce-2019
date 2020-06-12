import React, { useState } from "react";
import { CurrencyFormatter } from "../../../utils/Formatter";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  IconButton,
  NativeSelect,
  FormControl,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  removeProductFromCart,
  updateProductInCart,
} from "../../../context/actions/CartAction";
import { useDispatch } from "react-redux";

const ProductContainer = ({ product }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [quantity] = useState(product.quantity);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantityNumber = Number(event.target.value);
    dispatch(updateProductInCart(product._id, quantityNumber));
  };

  // Gen options 1-99
  let options = [];
  for (let i = 1; i < 100; i++)
    options.push(
      <option key={`${product._id}-${i}`} value={i}>
        {i}
      </option>
    );

  // Component
  const quantitySelection = (
    <FormControl>
      <NativeSelect
        variant="filled"
        value={quantity}
        onChange={handleChange}
        name={`${product._id} - selection`}
        inputProps={{ "aria-label": "quantity" }}
      >
        {options}
      </NativeSelect>
    </FormControl>
  );

  return (
    <div className="px-2 ">
      <div
        className="flex items-center border-bottom"
        style={{ minHeight: "73px" }}
      >
        <div>
          <img
            src={`/${product.images[0]}`}
            alt={`${product.title}_1`}
            className={`${classes.imgSize} hidden md:block`}
          />
        </div>
        <div className="flex-grow  ml-2">
          <NavLink
            to={`/product/${product._id}`}
            className="text-decoration-none"
          >
            <Typography>{product.title}</Typography>
          </NavLink>
        </div>
        <div
          className="py-2 mr-3"
          style={{
            borderLeft: "1px dotted 	rgb(224,224,224)",
            minWidth: "55px",
          }}
        >
          <Typography className="text-right">
            {CurrencyFormatter(product.price)}
          </Typography>
        </div>
        <div className="py-2 mr-2">{quantitySelection}</div>
        <div>
          <IconButton
            className="p-1"
            aria-label="remove"
            onClick={() => dispatch(removeProductFromCart(product._id))}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  imgSize: {
    maxWidth: "70px",
    maxHeight: "70px",
  },
}));

export default ProductContainer;
