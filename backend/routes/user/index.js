const express = require('express');

const {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../../controllers/users');

const {
  protect,
  isAdmin,
} = require('../../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, isAdmin, getUsers)
  .post(registerUser);

router.route('/login')
  .post(authUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/:id')
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

module.exports = router;