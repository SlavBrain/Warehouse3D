const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// 🔍 Поиск товаров по названию
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Параметр q обязателен' });
    }

    const regex = new RegExp(q, 'i');
    const products = await Product.find({ name: regex }).limit(10);
    res.json(products);
  } catch (err) {
    console.error('Ошибка поиска:', err);
    res.status(500).json({ error: 'Ошибка при поиске товара' });
  }
});

// 📦 Получить все товары
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Ошибка получения списка товаров:', err);
    res.status(500).json({ error: 'Ошибка при получении списка товаров' });
  }
});

// ➕ Добавить товар с поддержкой customFields и объединения
router.post('/', async (req, res) => {
  try {
    const { name, category, quantity, purchasePrice, seller, customFields } = req.body;
    const product = new Product({ name, category, quantity, purchasePrice, seller, customFields});

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ error: 'Категория не найдена' });
    }

    if (categoryDoc.mergeable) {
      const existing = await Product.findOne({ name, category });

      if (existing) {
        const totalQty = existing.quantity + quantity;
        const avgPrice = ((existing.purchasePrice * existing.quantity) + (purchasePrice * quantity)) / totalQty;

        existing.quantity = totalQty;
        existing.purchasePrice = avgPrice;
        existing.customFields = customFields; // обновляем поля
        await existing.save();

        return res.json({ message: 'Товар объединён', product: existing });
      }
    }

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Ошибка добавления товара:', err);
    res.status(500).json({ error: 'Ошибка при добавлении товара' });
  }
});

// ✏️ Обновить товар
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Ошибка обновления товара:', err);
    res.status(500).json({ error: 'Ошибка при обновлении товара' });
  }
});

// ❌ Удалить товар
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Товар удалён' });
  } catch (err) {
    console.error('Ошибка удаления товара:', err);
    res.status(500).json({ error: 'Ошибка при удалении товара' });
  }
});

module.exports = router;
