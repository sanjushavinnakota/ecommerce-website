const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/upload');
const verifyToken = require("../middleware/authMiddleware");

// GET all or filtered products
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
// Single, clean, protected route with image upload
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, para, price, category, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const product = new Product({
      name,
      para,
      price,
      category,
      location,
      image,
      // userId: req.user.id // Optional: associate with logged-in user
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;
