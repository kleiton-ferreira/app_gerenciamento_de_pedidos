//backend/controllers/sellerController.js

const Seller = require('../models/Seller');

// @route   GET /api/sellers
// @desc    Get all sellers
exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().sort({ createdAt: -1 });
    res.json(sellers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/sellers/:id
// @desc    Get seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ msg: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Seller not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/sellers
// @desc    Create new seller
exports.createSeller = async (req, res) => {
  const { name, email, phone, cpf } = req.body;

  try {
    // Check if CPF already exists
    let seller = await Seller.findOne({ cpf });
    if (seller) {
      return res.status(400).json({ msg: 'CPF already exists' });
    }

    const newSeller = new Seller({ name, email, phone, cpf });
    const savedSeller = await newSeller.save();
    res.json(savedSeller);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/sellers/:id
// @desc    Update seller
exports.updateSeller = async (req, res) => {
  const { name, email, phone, cpf } = req.body;

  try {
    let seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ msg: 'Seller not found' });
    }

    // Check if CPF is being changed to one that already exists
    if (cpf && cpf !== seller.cpf) {
      const existingSeller = await Seller.findOne({ cpf });
      if (existingSeller) {
        return res.status(400).json({ msg: 'CPF already exists' });
      }
    }

    seller = await Seller.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, phone, cpf } },
      { new: true }
    );

    res.json(seller);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/sellers/:id
// @desc    Delete seller
exports.deleteSeller = async (req, res) => {
  try {
    let seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ msg: 'Seller not found' });
    }

    await Seller.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Seller removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};