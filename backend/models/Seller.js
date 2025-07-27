const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pan: String,
  phone: String,
  email: String,
  gstin: String,
  displayName: String,
  pickupAddress: String,
});

module.exports = mongoose.model('Seller', SellerSchema);
