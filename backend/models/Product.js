// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  para: String,
  location: String,
  image: String,
});

module.exports = mongoose.model('Marketplace', productSchema);
