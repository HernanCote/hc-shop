const express = require('express');

const {
  protect,
  isAdmin,
} = require('../../middleware/auth');

const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} = require('../../controllers/products');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, isAdmin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

module.exports = router;