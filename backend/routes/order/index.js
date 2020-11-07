import express from 'express';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,

} from '../../controllers/orders/index.js';
import { protect, isAdmin } from '../../middleware/auth.js';

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

export default router;