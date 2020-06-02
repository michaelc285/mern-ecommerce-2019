import React, { useState, Fragment } from "react";
import { IProduct } from "../../../../types/interfaces";
import Carousel from "react-bootstrap/Carousel";

interface IDisplay {
  product: IProduct;
}

const Display = ({ product }: IDisplay) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: number, e: any) =>
    setIndex(selectedIndex);

  const slideItem = product.images.map((image, index) => (
    <Carousel.Item key={`${product._id}-${index}`}>
      <img
        className="w-full h-auto"
        src={`/${image}`}
        alt={`${product.title}-${index}`}
      />
    </Carousel.Item>
  ));

  return (
    <Fragment>
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {slideItem}
      </Carousel>
    </Fragment>
  );
};

export default Display;
