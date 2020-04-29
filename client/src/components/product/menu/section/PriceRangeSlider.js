import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Slider, Input, Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const maxLimit = 9999;
const minLimit = 0;

const inputProps = {
  step: 100,
  min: minLimit,
  max: maxLimit,
  type: "number",
  "aria-labelledby": "input-slider",
};

const valuetext = (value) => `$ ${value}`;

const PriceRangeSlider = () => {
  const classes = useStyles();
  const [price, setPrice] = useState([minLimit, maxLimit]);

  const handleChange = (event, newValue) => setPrice(newValue);

  const handleMinInputChange = (e) => {
    let arr = [Number(e.target.value), price[1]];
    arr.sort((a, b) => a - b);
    setPrice(arr);
  };

  const handleMaxInputChange = (e) => {
    setPrice([price[0], Number(e.target.value)].sort((a, b) => a - b));
  };

  const handleSubmitButton = (e) => {
    let [minPrice, maxPrice] = price;
    if (minPrice < minLimit) minPrice = minLimit;
    if (maxPrice > maxLimit) maxPrice = maxLimit;
    setPrice([minPrice, maxPrice]);
    console.log(`MinPrice ${minPrice}, MaxPrice ${maxPrice}`);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Price range:
      </Typography>

      <Slider
        max={maxLimit}
        min={minLimit}
        value={price}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      </div>

      <Button
        variant="outlined"
        style={{ marginTop: "1em" }}
        onClick={handleSubmitButton}
      >
        Submit
      </Button>
    </div>
  );
};

export default PriceRangeSlider;
