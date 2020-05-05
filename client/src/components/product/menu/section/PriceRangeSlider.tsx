import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Slider, Input, Button } from "@material-ui/core";
import { ITarget } from "../../../../types/interfaces";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

// const inputProps = {
//   step: 100,
//   min: minLimit,
//   max: maxLimit,
//   type: "number",
//   "aria-labelledby": "input-slider",
// };

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

  // const handleMinInputChange = (e: ITarget) => {
  //   let arr = [Number(e.target.value), price[1]];
  //   arr.sort((a, b) => a - b);
  //   setPrice(arr);
  // };

  // const handleMaxInputChange = (e: ITarget) => {
  //   setPrice([price[0], Number(e.target.value)].sort((a, b) => a - b));
  // };

  // const handleSubmitButton = (e: ITarget) => {
  //   let [minPrice, maxPrice] = price;
  //   if (minPrice < minLimit) minPrice = minLimit;
  //   if (maxPrice > maxLimit) maxPrice = maxLimit;
  //   setPrice([minPrice, maxPrice]);
  //   console.log(`MinPrice ${minPrice}, MaxPrice ${maxPrice}`);
  // };

  return (
    <div className={classes.root}>
      <Typography>Price range:</Typography>

      <Slider
        max={max}
        min={min}
        value={price}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />

      {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Input
          value={price[0]}
          inputProps={inputProps}
          onChange={handleMinInputChange}
        />
        <span style={{ paddingLeft: "5px", paddingRight: "10px" }}>
          <strong>-</strong>
        </span>
        <Input
          value={price[1]}
          inputProps={inputProps}
          onChange={handleMaxInputChange}
        /> 
      </div>*/}
    </div>
  );
};

export default PriceRangeSlider;
