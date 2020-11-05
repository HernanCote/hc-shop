const express = require('express');

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,

} = require('../../controllers/orders');
const { protect, isAdmin } = require('../../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, isAdmin, getOrders)
  .post(protect, addOrderItems);

router.route('/my-orders')
  .get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/delivered')
  .put(protect, isAdmin, updateOrderToDelivered);

module.exports = router;