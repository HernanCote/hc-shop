const express = require('express');

const {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
} = require('../../controllers/users');

const { protect } = require('../../middleware/auth');

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;