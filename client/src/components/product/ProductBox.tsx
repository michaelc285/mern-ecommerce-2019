import React from "react";
import { Card, Button } from "react-bootstrap";

interface IProductBox {
  image: string;
  title: string;
  desc: string;
  price: number;
  _id: string;
}

const ProductBox = ({ _id, image, title, desc, price }: IProductBox) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={image}
        style={{ width: "100%", height: "220px" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{desc}</Card.Text>

        <span style={{ fontSize: "1.5rem" }}>
          <strong>$ {price}</strong>
        </span>
      </Card.Body>
      <Card.Footer style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outline-success"
          href="#"
          onClick={() => console.log(_id)}
        >
          Add to Cart
        </Button>
        <Button variant="outline-success" href={`/product/${_id}`}>
          Browse
        </Button>
      </Card.Footer>
    </Card>
  );
};
export default ProductBox;
