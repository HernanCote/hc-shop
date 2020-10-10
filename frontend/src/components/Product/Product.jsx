import React from 'react';
import { Card } from 'react-bootstrap';

const Product = ({
  _id,
  image,
  name,
  rating,
  numReviews,
  price,
}) => (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${_id}`}>
        <Card.Img src={image} variant="top"></Card.Img>
      </a>
      <Card.Body>
        <a href={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="div">
          <div className="my-3">{rating} from {numReviews} Reviews</div>
        </Card.Text>
        <Card.Text as="h3">
          ${price}
        </Card.Text>
      </Card.Body>
    </Card>
  );

export default Product;
