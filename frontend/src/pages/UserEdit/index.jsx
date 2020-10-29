import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

import {
  getUserDetails,
  updateUser,
} from '../../actions';

import { USER_UPDATE_RESET } from '../../constants';

const UserEdit = ({
  match,
  history,
}) => {

  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { userDetails, userUpdate } = useSelector(state => state);
  const { loading, error, user } = userDetails;
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
      history.push('/admin/users');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, successUpdate, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      _id: userId,
      name,
      email,
      isAdmin,
    }));
  };

  return (
    <>
      <Link
        to="/admin/users"
        className="btn btn-light my-3"
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading
          ? <Loader />
          : error
            ? <Message variant="danger">{error}</Message>
            : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    required
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    required
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="isadmin">
                  <Form.Check
                    type="checkbox"
                    label="User is admin?"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                >
                  Update
                </Button>
              </Form>
            )
        }
      </FormContainer>
    </>
  );
};

export default UserEdit;
