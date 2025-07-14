const express = require('express');
const router = express.Router();

router.post('/eazypay', (req, res) => {
  const { amount, buyerName, buyerEmail, productName } = req.body;

  if (!amount || !buyerName || !buyerEmail || !productName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const merchantId = '123456'; 
  const referenceNo = 'ORDER' + Date.now(); 
  const redirectUrl = encodeURIComponent('https://your-frontend-app.com/payment-success');

  const paymentUrl = `https://eazypay.icicibank.com/EazyPG?merchantid=${merchantId}&amount=${amount}&referenceNo=${referenceNo}&redirecturl=${redirectUrl}`;

  return res.json({ paymentUrl });
});

module.exports = router;
