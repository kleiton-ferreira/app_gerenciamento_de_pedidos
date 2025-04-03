//backend/routes/sellerRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getSellers,
  getSellerById,
  createSeller,
  updateSeller,
  deleteSeller
} = require('../controllers/sellerController');

// @route   GET /api/sellers
// @desc    Get all sellers
router.get('/', auth, getSellers);

// @route   GET /api/sellers/:id
// @desc    Get seller by ID
router.get('/:id', auth, getSellerById);

// @route   POST /api/sellers
// @desc    Create new seller
router.post('/', auth, createSeller);

// @route   PUT /api/sellers/:id
// @desc    Update seller
router.put('/:id', auth, updateSeller);

// @route   DELETE /api/sellers/:id
// @desc    Delete seller
router.delete('/:id', auth, deleteSeller);

module.exports = router;
