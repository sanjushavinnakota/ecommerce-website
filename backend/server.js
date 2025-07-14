const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Fix: Apply CORS only once, with proper config
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// ✅ Then JSON parser
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/authRoutes');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('MSME Marketplace API is running...');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
