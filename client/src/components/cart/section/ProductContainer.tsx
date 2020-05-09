import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const ProductContainer = ({ product }: any) => {
  const classes = useStyles();

  const quantityButtonGroup = (
    <Grid
      container
      spacing={1}
      direction={"row"}
      justify={"center"}
      alignItems={"center"}
      className={classes.quantityButtonGroup}
    >
      <Grid item>
        <IconButton
          disableRipple={true}
          disableFocusRipple={true}
          aria-label="plus"
          className={classes.iconButtonLeft}
        >
          <AddIcon className={classes.icon} />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography className={classes.quantityText}>0</Typography>
        {/* <InputBase className={classes.input} /> */}
      </Grid>
      <Grid item>
        <IconButton aria-label="minus" className={classes.iconButtonRight}>
          <RemoveIcon className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
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
      <Grid item xl={6} lg={6} md={6} xs={7} className={classes.titleBox}>
        <Typography className={classes.titleBox}>{product.title}</Typography>
      </Grid>
      <Grid item xl={2} lg={2} md={2} xs={5} className={classes.buttonBox}>
        {quantityButtonGroup}
      </Grid>
      <Grid item xl={2} lg={2} md={2} xs={7} className={classes.priceBox}>
        <Typography>$ {product.price}</Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderBottom: "1px solid rgb(180, 180, 180)",
    margin: "0 auto 3px auto",
    width: "95%",
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
}));

export default ProductContainer;
