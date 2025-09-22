const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
});

router.get('/', async (req, res) => {
  const recipes = await Recipe.find().populate('components.productId');
  res.json(recipes);
});

module.exports = router;
