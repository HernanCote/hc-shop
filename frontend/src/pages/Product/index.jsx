import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';

import { getProductDetails } from '../../actions';
import Message from '../../components/Message';

const Product = ({
  match,
  history,
}) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product = {} } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

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
      {
        loading
          ? <Loader />
          : error
            ? <Message variant="danger">{error}</Message>
            :
            (
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
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                {[...Array(countInStock).keys()].map(x => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
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
            )
      }
    </>
  );
};

export default Product;
