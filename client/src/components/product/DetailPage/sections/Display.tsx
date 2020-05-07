import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { IProduct } from "../../../../types/interfaces";
import Carousel from "react-bootstrap/Carousel";

interface IDisplay {
  product: IProduct;
}

const Display = ({ product }: IDisplay) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: number, e: any) =>
    setIndex(selectedIndex);

  const slideItem = product.images.map((image, index) => (
    <Carousel.Item key={`${product._id}-${index}`}>
      <img
        className="d-block w-100"
        src={`/${image}`}
        alt={`${product.title}-${index}`}
      />
    </Carousel.Item>
  ));

  return (
    <Paper className={classes.paper}>
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {slideItem}
      </Carousel>
    </Paper>
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
    },
  })
);

export default Display;
