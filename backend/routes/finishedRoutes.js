const express = require('express');
const router = express.Router();
const FinishedProduct = require('../models/FinishedProduct');
const Recipe = require('../models/Recipe');

// Получить все готовые изделия
router.get('/', async (req, res) => {
  try {
    const finished = await FinishedProduct.find().populate('recipeId');
    res.json(finished);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении готовой продукции' });
  }
});

// Получить готовые изделия по рецепту
router.get('/by-recipe/:id', async (req, res) => {
  try {
    const finished = await FinishedProduct.find({ recipeId: req.params.id });
    res.json(finished);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при фильтрации по рецепту' });
  }
});

module.exports = router;
