const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all or filtered
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.location) filter.location = req.query.location;
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
