import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductBox = ({ image, title, desc, price }) => {
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{desc}</Card.Text>

        <span style={{ fontSize: "1.5rem" }}>
          <strong>$ {price}</strong>
        </span>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-success">Add to Cart</Button>
      </Card.Footer>
    </Card>
  );
};
export default ProductBox;
