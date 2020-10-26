const express = require('express');

const { addOrderItems } = require('../../controllers/orders');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.route('/').post(protect, addOrderItems);

module.exports = router;