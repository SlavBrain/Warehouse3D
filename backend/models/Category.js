const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mergeable: { type: Boolean, default: false },
  fields: [
    {
      key: { type: String, required: true },     // например: "material"
      label: { type: String, required: true },   // например: "Материал"
      type: { type: String, default: 'text' }    // text, number, select и т.д.
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);
