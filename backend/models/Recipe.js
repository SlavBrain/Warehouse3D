const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  components: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  modelFileUrl: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
