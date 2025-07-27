// routes/payment.js
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,     // Set in .env
  key_secret: process.env.RAZORPAY_SECRET, // Set in .env
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Valid amount is required" });
    }

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: "receipt_order_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.error("Failed to create Razorpay order:", err.message);
    return res.status(500).json({ error: "Failed to create Razorpay order", message: err.message });
  }
});

module.exports = router;
