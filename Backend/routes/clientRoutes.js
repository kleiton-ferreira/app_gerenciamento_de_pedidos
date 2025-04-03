//backend/routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

// @route   GET /api/clients
// @desc    Get all clients
router.get('/', auth, getClients);

// @route   GET /api/clients/:id
// @desc    Get client by ID
router.get('/:id', auth, getClientById);

// @route   POST /api/clients
// @desc    Create new client
router.post('/', auth, createClient);

// @route   PUT /api/clients/:id
// @desc    Update client
router.put('/:id', auth, updateClient);

// @route   DELETE /api/clients/:id
// @desc    Delete client
router.delete('/:id', auth, deleteClient);

module.exports = router;
