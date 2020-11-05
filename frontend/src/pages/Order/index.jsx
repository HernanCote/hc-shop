import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
} from 'react-bootstrap';

import { PayPalButton } from 'react-paypal-button-v2';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  getOrderDetails,
  payOrder,
  orderDelivered as orderDelivery,
} from '../../actions';

import {
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from '../../constants';

import { addDecimals } from '../../utils';

const Order = ({
  match,
  history,
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const {
    orderDetails,
    orderPay,
    userLogin,
    orderDelivered
  } = useSelector(state => state);

  const { order, loading, error } = orderDetails;
  const { loading: loadingPay, success: successPay } = orderPay;
  const { userInfo } = userLogin;
  const { loading: loadingDeliver, success: successDeliver } = orderDelivered;

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=/order/${orderId}`);
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVERED_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [successDeliver, order, orderId, dispatch, userInfo, history, successPay]);

  if (!loading && order) {
    order.itemsPrice = addDecimals(order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  }

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult));
    dispatch({ type: ORDER_CREATE_RESET });
  };

  const deliverHandler = () => {
    dispatch(orderDelivery(order));
  };

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
            <Card>
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
                {!order.isPaid && (
                  <ListGroup.Item>
                    {(loadingPay || !sdkReady) ? <Loader /> : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {
                  userInfo?.isAdmin
                  && order.isPaid
                  && !order.isDelivered
                  && !loadingDeliver
                  && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >Flag as delivered</Button>
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    );
};

export default Order;
