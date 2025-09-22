const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  quantity: Number,
  purchaseDate: Date,
  purchasePrice: Number,
  seller: String,
  customFields: { type: Object, default: {} }  
});

module.exports = mongoose.model('Product', productSchema);
