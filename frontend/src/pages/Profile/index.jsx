import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  getUserDetails,
  updateUserProfile,
  myOrdersList as myOrdersListAction,
} from '../../actions';

const Profile = ({
  history,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrdersList = useSelector(state => state.myOrdersList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders = [],
  } = myOrdersList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      if (!user?.name) {
        dispatch(getUserDetails('profile'))
        dispatch(myOrdersListAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({
        id: user._id,
        name,
        email,
        password,
      }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile updated successfully.</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Update Your Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {orders.length === 0 && <Message variant="info">You don't have any orders yet.</Message>}
        {orders.length > 0 && (loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid
                    ? order.paidAt.substring(0, 10)
                    : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                  <td>{order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        className="btn-sm"
                        variant="light"
                      >
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ))}
      </Col>
    </Row>
  )
}

export default Profile;
