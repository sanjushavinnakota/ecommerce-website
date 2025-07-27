const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const sellerRoutes = require('./routes/sellerRoutes');
app.use('/api/sellers', sellerRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
