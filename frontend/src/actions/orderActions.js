import axios from 'axios';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  LIST_MY_ORDERS_REQUEST,
  LIST_MY_ORDERS_SUCCESS,
  LIST_MY_ORDERS_FAIL,
} from '../constants';

import {
  getErrorMessage,
} from './utils';

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    });

    const {
      userLogin: {
        userInfo
      }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/orders',
      order,
      config,
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const getOrderDetails = orderId => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });

    const {
      userLogin: {
        userInfo
      }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders/${orderId}`,
      config,
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    });

    const {
      userLogin: {
        userInfo
      }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const myOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_MY_ORDERS_REQUEST
    });

    const {
      userLogin: {
        userInfo
      }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders/my-orders`,
      config,
    );

    dispatch({
      type: LIST_MY_ORDERS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: LIST_MY_ORDERS_FAIL,
      payload: getErrorMessage(error),
    });
  }
};
