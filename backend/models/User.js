const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: false, unique: true },
  otp: String,          // store OTP temporarily
  otpExpires: Date,     // expiration for OTP
  name: String,
  email: String,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
