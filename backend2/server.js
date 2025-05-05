require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/buyer', buyerRoutes);
app.use('/seller', sellerRoutes);
app.use('/auth', authRoutes)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});