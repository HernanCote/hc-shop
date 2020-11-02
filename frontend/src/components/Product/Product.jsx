import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import Rating from '../Rating';

const Product = ({
  _id,
  image,
  name,
  rating,
  numReviews,
  price,
}) => (
    <Card className="my-3 rounded">
      <Link to={`/products/${_id}`}>
        <Card.Img
          src={image || '/images/not-found.jpg'}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={rating}
            text={`${numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">
          ${price}
        </Card.Text>
      </Card.Body>
    </Card>
  );

export default Product;
