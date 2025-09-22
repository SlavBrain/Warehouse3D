const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('ManufacturingQueueItem', queueSchema);
