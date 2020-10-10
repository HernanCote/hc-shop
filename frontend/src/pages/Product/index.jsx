import React from 'react'
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap';

import Rating from '../../components/Rating';

import products from '../../products';

const Product = ({
  match,
}) => {
  const product = products.find(p => p._id === match.params.id);
  const {
    image,
    name,
    rating,
    numReviews,
    price,
    description,
    countInStock,
  } = product;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
      <Row>
        <Col md={6}>
          <Image
            src={image}
            alt={name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={rating}
                text={`${numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col><strong>${price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>{countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  disabled={countInStock === 0}
                  className="btn-block"
                  type="button"
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;
