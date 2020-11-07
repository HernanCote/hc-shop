import express from 'express';

import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../../controllers/users/index.js';

import {
  protect,
  isAdmin,
} from '../../middleware/auth.js';

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

export default router;