import express from 'express';

import {
  protect,
  isAdmin,
} from '../../middleware/auth.js';

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../../controllers/products/index.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, isAdmin, createProduct);

router.route('/top')
  .get(getTopProducts);

router.route('/:id/reviews')
  .post(protect, createProductReview);

router.route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;