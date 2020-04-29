import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import SearchBar from "./section/SearchBar";
import Category from "./section/Category";
import PriceRangeSlider from "./section/PriceRangeSlider";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProductMenu = () => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="menu">
      <ListItem>
        <SearchBar />
      </ListItem>

      <Divider />

      <ListItem>
        <Category />
      </ListItem>

      <Divider />

      <ListItem>
        <PriceRangeSlider />
      </ListItem>
    </List>
  );
};

export default ProductMenu;
