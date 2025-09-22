const mongoose = require('mongoose');

const finishedSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  manufactureDate: Date,
});

module.exports = mongoose.model('FinishedProduct', finishedSchema);
