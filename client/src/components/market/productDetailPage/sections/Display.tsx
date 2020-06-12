import React, { useState } from "react";
import { IProduct } from "../../../../types/interfaces";

//Components
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

interface IDisplay {
  product: IProduct;
}

const Display = ({ product }: IDisplay) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating] = useState(false);
  const { title, _id, images } = product;

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = images.map((image, index) => (
    <CarouselItem key={`${_id}-${index}`}>
      <img
        src={`/${image}`}
        alt={`${title}-${index}`}
        style={{ overflow: "hidden" }}
      />
    </CarouselItem>
  ));

  const items = product.images.map((item: any) => {
    return { src: `/${item}` };
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Display;
