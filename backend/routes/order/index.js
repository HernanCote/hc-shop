const express = require('express');

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require('../../controllers/orders');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;