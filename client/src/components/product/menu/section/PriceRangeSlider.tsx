import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Slider } from "@material-ui/core";

const valuetext = (value: number) => `$ ${value}`;

interface IPriceRangeSlider {
  handlePrice: Function;
  price: number[];
  max: number;
  min: number;
}

const PriceRangeSlider = ({
  handlePrice,
  price,
  max,
  min,
}: IPriceRangeSlider) => {
  const classes = useStyles();

  const handleSliderChange = (e: object, value: any) => handlePrice(value);

  return (
    <div className={classes.root}>
      <Typography id="price-range-slider">Price Range</Typography>

      <Slider
        max={max}
        min={min}
        value={price}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="price-range-slider"
        getAriaValueText={valuetext}
        style={{
          display: "flex",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
});

export default PriceRangeSlider;
