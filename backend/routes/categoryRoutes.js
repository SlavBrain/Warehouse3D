const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Получить все категории
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Ошибка получения категорий:', err);
    res.status(500).json({ error: 'Ошибка при получении категорий' });
  }
});

// Добавить категорию
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Ошибка добавления категории:', err);
    res.status(500).json({ error: 'Ошибка при добавлении категории' });
  }
});

module.exports = router;
