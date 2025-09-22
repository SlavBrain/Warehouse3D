require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { authMiddleware } = require('./middleware/auth');
const recipeRoutes = require('./routes/recipeRoutes');
const queueRoutes = require('./routes/queueRoutes');
const finishedRoutes = require('./routes/finishedRoutes'); // если есть
const saleRoutes = require('./routes/saleRoutes');
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
  
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/finished', finishedRoutes); // если реализовано
app.use('/api/sales', saleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
