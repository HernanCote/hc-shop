import axios from 'axios';

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../constants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const {
    _id: product,
    name,
    image,
    price,
    countInStock } = data;

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product,
      name,
      image,
      price,
      countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};