import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
} from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { getOrderDetails } from '../../actions';

import { addDecimals } from '../../utils';

const Order = ({
  match,
  history,
}) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=/order/${orderId}`);
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [order, orderId, dispatch, userInfo, history]);

  if (!loading && order) {
    order.itemsPrice = addDecimals(order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  }


  return loading
    ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {order.isDelivered ? <Message variant="success">Delivered on: {order.deliveredAt}</Message> : <Message variant="danger">Not delivered</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? <Message variant="success">Paid on: {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Details</h2>
                {order.orderItems.length === 0
                  ? <Message>Order is empty</Message>
                  : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, idx) => (
                        <ListGroup.Item key={idx}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    );
};

export default Order;
