const express = require('express');
const router = express.Router();
const QueueItem = require('../models/ManufacturingQueueItem');
const FinishedProduct = require('../models/FinishedProduct');

router.post('/', async (req, res) => {
  const item = new QueueItem({ recipeId: req.body.recipeId });
  await item.save();
  res.status(201).json(item);
});

router.put('/:id/confirm', async (req, res) => {
  const item = await QueueItem.findById(req.params.id);
  item.status = 'confirmed';
  await item.save();

  const finished = new FinishedProduct({
    recipeId: item.recipeId,
    manufactureDate: new Date(),
  });
  await finished.save();

  res.json({ item, finished });
});

router.get('/', async (req, res) => {
  const queue = await QueueItem.find().populate('recipeId');
  res.json(queue);
});

module.exports = router;
