//backend/controllers/clientController.js

const Client = require('../models/Client');

// @route   GET /api/clients
// @desc    Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/clients/:id
// @desc    Get client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/clients
// @desc    Create new client
exports.createClient = async (req, res) => {
  const { name, email, phone, address, cpf } = req.body;

  try {
    // Check if CPF already exists
    let client = await Client.findOne({ cpf });
    if (client) {
      return res.status(400).json({ msg: 'CPF already exists' });
    }

    const newClient = new Client({ name, email, phone, address, cpf });
    const savedClient = await newClient.save();
    res.json(savedClient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/clients/:id
// @desc    Update client
exports.updateClient = async (req, res) => {
  const { name, email, phone, address, cpf } = req.body;

  try {
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    // Check if CPF is being changed to one that already exists
    if (cpf && cpf !== client.cpf) {
      const existingClient = await Client.findOne({ cpf });
      if (existingClient) {
        return res.status(400).json({ msg: 'CPF already exists' });
      }
    }

    client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, phone, address, cpf } },
      { new: true }
    );

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/clients/:id
// @desc    Delete client
exports.deleteClient = async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    await Client.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Client removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
