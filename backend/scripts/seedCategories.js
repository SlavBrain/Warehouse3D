require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const categories = [
  {
    name: 'Фурнитура',
    mergeable: true,
    fields: [
      { key: 'material', label: 'Материал', type: 'text' },
      { key: 'color', label: 'Цвет', type: 'text' },
      { key: 'size', label: 'Размер', type: 'text' }
    ]
  },
  {
    name: 'Электроника',
    mergeable: false,
    fields: [
      { key: 'voltage', label: 'Напряжение', type: 'number' },
      { key: 'power', label: 'Мощность', type: 'number' },
      { key: 'warranty', label: 'Гарантия', type: 'text' }
    ]
  },
  {
    name: 'Упаковка',
    mergeable: true,
    fields: [
      { key: 'type', label: 'Тип упаковки', type: 'text' },
      { key: 'volume', label: 'Объём', type: 'number' }
    ]
  }
];

async function seed() {
  for (const cat of categories) {
    const existing = await Category.findOne({ name: cat.name });

    if (existing) {
      await Category.updateOne({ _id: existing._id }, cat);
      console.log(`Обновлена категория: ${cat.name}`);
    } else {
      await Category.create(cat);
      console.log(`Добавлена новая категория: ${cat.name}`);
    }
  }

  mongoose.disconnect();
}

seed();
