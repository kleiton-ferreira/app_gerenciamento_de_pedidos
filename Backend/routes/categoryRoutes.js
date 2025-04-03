//backend/routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById // Import getCategoryById here
} = require('../controllers/categoryController');

// @route   GET /api/categories
// @desc    Get all categories
router.get('/', auth, getCategories);

// @route   GET /api/categories/:id
// @desc    Get category by ID
router.get('/:id', auth, getCategoryById);

// @route   POST /api/categories
// @desc    Create new category
router.post('/', auth, createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
router.put('/:id', auth, updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
router.delete('/:id', auth, deleteCategory);

module.exports = router;