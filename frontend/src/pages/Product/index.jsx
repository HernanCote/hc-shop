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
  Modal,
} from 'react-bootstrap';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

import { getProductDetails, createProductReview } from '../../actions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants';

const Product = ({
  match,
  history,
}) => {
  const productId = match.params.id;
  const [qty, setQty] = useState(1);

  const [localRating, setLocalRating] = useState(0);
  const [comment, setComment] = useState('');

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { productDetails, productCreateReview, userLogin } = useSelector(state => state);
  const { loading, error, product = {} } = productDetails;
  const { userInfo } = userLogin;
  const { success: successReview, error: errorReview } = productCreateReview;

  useEffect(() => {
    if (successReview) {
      setLocalRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setShowModal(true);
    }

    dispatch(getProductDetails(productId));
  }, [dispatch, productId, successReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitReviewHandler = e => {
    e.preventDefault();
    dispatch(createProductReview(productId, {
      rating: localRating,
      comment,
    }));
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
              <>
                <Meta
                  title={`ProShop | ${product.name}`}
                />
                <Modal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Review Added
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Review submitted successfully!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                  </Modal.Footer>
                </Modal>
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
                <Row>
                  <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>There are no reviews for this product.</Message>}
                    <ListGroup variant="flush">
                      {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {errorReview && <Message variant="danger">{errorReview}</Message>}
                        {
                          !userInfo && (
                            <div>
                              <Link to={`/login?redirect=/products/${productId}`}>Sign In</Link> to add a review
                            </div>
                          )
                        }
                        {
                          userInfo && (
                            <Form onSubmit={submitReviewHandler}>
                              <Form.Group controlId="rating">
                                <Form.Label>
                                  Rating
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  value={localRating}
                                  onChange={e => setLocalRating(e.target.value)}
                                >
                                  <option value=''>Select...</option>
                                  <option value='1'>1 - Poor</option>
                                  <option value='2'>2 - Fair</option>
                                  <option value='3'>3 - Good</option>
                                  <option value='4'>4 - Very Good</option>
                                  <option value='5'>5 - Excellent</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  row={3}
                                  value={comment}
                                  onChange={e => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              <Button
                                type="submit"
                                variant="primary"
                              >
                                Submit review
                              </Button>
                            </Form>
                          )
                        }
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </>
            )
      }
    </>
  );
};

export default Product;
