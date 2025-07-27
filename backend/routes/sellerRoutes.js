const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, phone, gstin, pan, displayName, pickupAddress } = req.body;

    const existing = await Seller.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new Seller({
      username,
      password: hashedPassword,
      email,
      phone,
      gstin,
      pan,
      displayName,
      pickupAddress,
    });

    await seller.save();
    res.status(201).json({ message: 'Seller registered' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering seller' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const seller = await Seller.findOne({ username });
    if (!seller) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

module.exports = router;
