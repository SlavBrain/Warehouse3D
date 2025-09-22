const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  quantity: Number,
  purchases: [
    {
      seller: String,
      purchasePrice: Number,
      purchaseDate: Date
    }
  ],
  customFields: Object,
  analogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Product', productSchema);
