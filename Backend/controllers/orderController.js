//backend/controllers/orderController.js

const Order = require('../models/Order');
const Client = require('../models/Client');
const Category = require('../models/Category');
const Seller = require('../models/Seller');

// @route   GET /api/orders
// @desc    Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('client', 'name email phone address')
      .populate('category', 'name')
      .populate('seller', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/orders/:id
// @desc    Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('category', 'name')
      .populate('seller', 'name');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/orders
// @desc    Create new order
exports.createOrder = async (req, res) => {
  const { client, category, seller, amount, description } = req.body;

  try {
    // Check if client, category and seller exist
    const clientExists = await Client.findById(client);
    const categoryExists = await Category.findById(category);
    const sellerExists = await Seller.findById(seller);

    if (!clientExists || !categoryExists || !sellerExists) {
      return res.status(400).json({ msg: 'Invalid client, category or seller' });
    }

    const newOrder = new Order({ client, category, seller, amount, description });
    const savedOrder = await newOrder.save();
    
    // Populate the saved order before returning
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('client', 'name')
      .populate('category', 'name')
      .populate('seller', 'name');

    res.json(populatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/orders/:id
// @desc    Update order
exports.updateOrder = async (req, res) => {
  const { client, category, seller, amount, description } = req.body;

  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if client, category and seller exist
    const clientExists = await Client.findById(client);
    const categoryExists = await Category.findById(category);
    const sellerExists = await Seller.findById(seller);

    if (!clientExists || !categoryExists || !sellerExists) {
      return res.status(400).json({ msg: 'Invalid client, category or seller' });
    }

    order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { client, category, seller, amount, description } },
      { new: true }
    ).populate('client', 'name')
     .populate('category', 'name')
     .populate('seller', 'name');

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/orders/:id
// @desc    Delete order
exports.deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};