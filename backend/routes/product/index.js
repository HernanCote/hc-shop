const express = require('express');

const {
  protect,
  isAdmin,
} = require('../../middleware/auth');

const {
  getProducts,
  getProductById,
  deleteProduct,
} = require('../../controllers/products');

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct);

module.exports = router;