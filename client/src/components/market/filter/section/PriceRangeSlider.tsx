import React from "react";
import { Slider } from "@material-ui/core";

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
  const handleSliderChange = (e: object, value: any) => handlePrice(value);

  return (
    <div className="w-full">
      <h1 className="text-base mb-2">Price Range</h1>
      <div className="w-4/5 mx-auto">
        <Slider
          max={max}
          min={min}
          value={price}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="price-range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
