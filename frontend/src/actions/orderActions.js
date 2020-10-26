import axios from 'axios';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
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
