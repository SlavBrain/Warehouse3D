const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  quantity: Number,
  purchaseDate: Date,
  purchasePrice: Number,
  purchases: [
  {
    seller: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now }
  }
  ],
  customFields: { type: Object, default: {} }  
});

module.exports = mongoose.model('Product', productSchema);
