//backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

// @route   GET /api/orders
// @desc    Get all orders
router.get('/', auth, getOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
router.get('/:id', auth, getOrderById);

// @route   POST /api/orders
// @desc    Create new order
router.post('/', auth, createOrder);

// @route   PUT /api/orders/:id
// @desc    Update order
router.put('/:id', auth, updateOrder);

// @route   DELETE /api/orders/:id
// @desc    Delete order
router.delete('/:id', auth, deleteOrder);

module.exports = router;
