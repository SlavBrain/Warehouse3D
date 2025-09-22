const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'FinishedProduct' },
  salePrice: Number,
  extraCosts: Number,
  saleDate: Date,
});

module.exports = mongoose.model('Sale', saleSchema);
