import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  Button,
  Modal,
} from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { deleteUser, listUsers } from '../../actions';

const Users = ({
  history,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users = [] } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: isSuccessDelete } = userDelete;

  useEffect(() => {
    userInfo && userInfo.isAdmin ? dispatch(listUsers()) : history.push('/login');
  }, [userInfo, isSuccessDelete, dispatch, history]);

  const openModal = (user) => {
    setShowModal(true);
    setSelectedUser(user);
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser(selectedUser._id));
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the following user:</p>
          <ul>
            <li>{selectedUser.name} - ID ({selectedUser._id})</li>
          </ul>
          <p>
            This action is permanent.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteUserHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Users</h1>
      {loading
        ? <Loader />
        : error
          ? <Message variant="danger">{error}</Message>
          : (
            <Table
              className="table-sm"
              striped
              bordered
              hover
              responsive
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>
                      {user.isAdmin
                        ? (<i className="fas fa-check" style={{ color: 'green' }}></i>)
                        : (<i className="fas fa-times" style={{ color: 'red' }}></i>)
                      }
                    </td>
                    <td>
                      <LinkContainer to={`admin/users/${user._id}/edit`}>
                        <Button
                          variant="light"
                          className="btn-sm"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => openModal(user)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
      }
    </>
  );
};

export default Users;
