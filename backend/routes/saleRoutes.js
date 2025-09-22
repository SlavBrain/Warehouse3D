const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

router.post('/', async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.status(201).json(sale);
});

router.get('/profit', async (req, res) => {
  const { from, to } = req.query;
  const sales = await Sale.find({
    saleDate: { $gte: new Date(from), $lte: new Date(to) },
  }).populate('productId');

  const profit = sales.reduce((sum, s) => {
    const cost = s.productId.recipeId.components.reduce((c, comp) => c + comp.quantity * comp.productId.purchasePrice, 0);
    return sum + (s.salePrice - cost - s.extraCosts);
  }, 0);

  res.json({ profit });
});

module.exports = router;
