const jwt = require('jsonwebtoken');
const User = require('../models/User');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOTP = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone && !email) {
      return res.status(400).json({ message: "Please provide phone or email" });
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const otpExpires = Date.now() + 5 * 60 * 1000;

    let user = await User.findOne({ $or: [{ phone }, { email }] });
    if (!user) user = new User({ phone, email });

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    if (phone) {
      await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      return res.status(200).json({ message: "OTP sent to phone" });
    }

    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Login",
        html: `<h2>Your OTP is: ${otp}</h2><p>Expires in 5 minutes</p>`,
      });
      return res.status(200).json({ message: "OTP sent to email" });
    }

  } catch (err) {
    console.error("❌ OTP SEND FAILED:", err);
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
// verify otp
exports.verifyOTP = async (req, res) => {
  const { input, otp } = req.body;

  if (!input || !otp) {
    return res.status(400).json({ message: 'Input or OTP missing' });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  const query = isEmail ? { email: input } : { phone: input };

  const user = await User.findOne(query);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.otp !== otp || Date.now() > user.otpExpires) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return res.status(200).json({ message: 'OTP verified', token, user });
};
