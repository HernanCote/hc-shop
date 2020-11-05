import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  Button,
} from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { getOrders } from '../../actions';

const Orders = ({
  history,
}) => {
  const dispatch = useDispatch();

  const {
    userLogin,
    ordersList,
  } = useSelector(state => state);

  const { loading, error, orders = [] } = ordersList;
  const { userInfo } = userLogin;

  useEffect(() => {
    userInfo?.isAdmin ? dispatch(getOrders()) : history.push('/login');
  }, [userInfo, dispatch, history]);

  if (orders.length === 0) {
    return (
      <>
        {loading
          ? <Loader />
          : <>
            <h1>Orders</h1>
            <Message variant="info">There are no orders yet.</Message>
          </>
        }
      </>
    );
  }
  else {
    return (
      <>
        <h1>Orders</h1>
        {error
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
                  <th>DATE</th>
                  <th>USER</th>
                  <th>SHIPPING ADDRESS</th>
                  <th>TOTAL PRICE</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.user?.name}</td>
                    <td>{order.shippingAddress?.address}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid
                        ? (order.paidAt.substring(0, 10))
                        : (<i className="fas fa-times" style={{ color: 'red' }}></i>)
                      }
                    </td>
                    <td>
                      {order.isDelivered
                        ? (order.deliveredAt.substring(0, 10))
                        : (<i className="fas fa-times" style={{ color: 'red' }}></i>)
                      }
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button
                          variant="light"
                          className="btn-sm"
                        >
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        }
      </>
    );
  }
};

export default Orders;
