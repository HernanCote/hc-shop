const asyncHandler = require('express-async-handler');
const Product = require('../../models/product');

// @desc    Fetch all products
// @route   GET api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

// @desc    Fetch single product
// @route   GET api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Product not found');
});

// @desc    Delete single product
// @route   DELETE api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.remove();
  return res.status(200).json({ message: 'Product deleted' });
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
};