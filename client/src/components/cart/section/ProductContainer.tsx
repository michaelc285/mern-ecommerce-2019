import React, { useState } from "react";
import { CurrencyFormatter } from "../../../utils/NumberFormatter";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  IconButton,
  NativeSelect,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  removeProductFromCart,
  updateProductInCart,
} from "../../../context/actions/CartAction";
import { connect } from "react-redux";

const ProductContainer = ({
  product,
  removeProductFromCart,
  updateProductInCart,
}: any) => {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(product.quantity);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantityNumber = Number(event.target.value);
    updateProductInCart(product.id, quantityNumber)
      .then(() => setQuantity(quantity))
      .catch(() => alert("Quantity Update fail"));
  };

  let options = [];
  for (let i = 1; i < 100; i++)
    options.push(
      <option key={`${product.id}-${i}`} value={i}>
        {i}
      </option>
    );

  const quantitySelection = (
    <FormControl className={classes.formControl}>
      <NativeSelect
        value={quantity}
        onChange={handleChange}
        name={`${product.id} - selection`}
        className={classes.selectEmpty}
        inputProps={{ "aria-label": "quantity" }}
      >
        {options}
      </NativeSelect>
    </FormControl>
  );

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={classes.root}
      spacing={1}
    >
      <Grid item xl={2} lg={2} md={2} xs={4}>
        <img
          src={`/${product.images[0]}`}
          alt={`${product.title}_1`}
          className={classes.imgSize}
        />
      </Grid>
      <Grid item xl={5} lg={5} md={5} xs={7} className={classes.titleBox}>
        <Typography className={classes.titleBox}>{product.title}</Typography>
      </Grid>
      <Grid item xl={2} lg={2} md={2} xs={7} className={classes.priceBox}>
        <Typography>{CurrencyFormatter(product.price)}</Typography>
      </Grid>
      <Grid item xl={2} lg={2} md={2} xs={5} className={classes.buttonBox}>
        {quantitySelection}
      </Grid>
      <Grid item xl={1} lg={1} md={1} xs={1}>
        <IconButton
          aria-label="remove"
          onClick={() => removeProductFromCart(product.id)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderBottom: "1px solid rgb(180, 180, 180)",
    margin: "0 auto 3px auto",
    width: "98%",
    minHeight: "73px",
  },
  imgSize: {
    maxWidth: "70px",
    maxHeight: "70px",
  },
  quantityText: {
    width: "20px",
    textAlign: "center",
  },
  titleBox: {},
  buttonBox: {},
  priceBox: { textAlign: "right" },
  quantityButtonGroup: {},
  input: {
    width: "30px",
    height: "23px",
    textAlign: "center",
  },
  icon: {
    fontSize: "20px",
  },
  iconButtonLeft: {
    position: "relative",
    top: "-2px",
    borderRadius: "0",
    padding: "1px",
    marginRight: "1px",
  },
  iconButtonRight: {
    position: "relative",
    top: "-2px",
    borderRadius: "0",
    padding: "1px",
    marginLeft: "1px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default connect(null, { removeProductFromCart, updateProductInCart })(
  ProductContainer
);
