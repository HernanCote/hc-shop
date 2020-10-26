const express = require('express');

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require('../../controllers/orders');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;