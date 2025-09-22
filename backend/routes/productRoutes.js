const express = require('express');
const router = express.Router();
const ProductModel = require('../models/Product');
const CategoryModel = require('../models/Category');

// 🔹 Получить все товары
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    res.status(500).json({ error: 'Ошибка при получении товаров' });
  }
});

// 🔹 Получить товар по ID
router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(product);
  } catch (error) {
    console.error('Ошибка при получении товара:', error);
    res.status(500).json({ error: 'Ошибка при получении товара' });
  }
});

// 🔹 Добавить товар или закупку
router.post('/', async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      purchasePrice,
      seller,
      customFields,
      linkTo
    } = req.body;

    // Ручная привязка к существующему товару
    if (linkTo) {
      const targetProduct = await ProductModel.findById(linkTo);
      if (!targetProduct) {
        return res.status(404).json({ error: 'Товар для привязки не найден' });
      }

      targetProduct.purchases.push({
        seller,
        purchasePrice,
        purchaseDate: new Date()
      });

      targetProduct.quantity += quantity;

      if (customFields && typeof customFields === 'object') {
        targetProduct.customFields = {
          ...targetProduct.customFields,
          ...customFields
        };
      }

      const updated = await targetProduct.save();
      return res.status(200).json(updated);
    }

    // Получаем категорию
    const categoryDoc = await CategoryModel.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ error: 'Категория не найдена' });
    }

    // Проверка на объединение
    let existingProduct = null;
    if (categoryDoc.mergeable) {
      existingProduct = await ProductModel.findOne({ name, category });
    }

    if (existingProduct) {
      existingProduct.purchases.push({
        seller,
        purchasePrice,
        purchaseDate: new Date()
      });

      existingProduct.quantity += quantity;

      if (customFields && typeof customFields === 'object') {
        existingProduct.customFields = {
          ...existingProduct.customFields,
          ...customFields
        };
      }

      const updatedProduct = await existingProduct.save();
      return res.status(200).json(updatedProduct);
    }

    // Создаём новый товар
    const newProduct = new ProductModel({
      name,
      category,
      quantity,
      customFields,
      purchases: [
        {
          seller,
          purchasePrice,
          purchaseDate: new Date()
        }
      ]
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    res.status(500).json({ error: 'Ошибка при добавлении товара' });
  }
});

// 🔹 Обновить товар
router.put('/:id', async (req, res) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    res.status(500).json({ error: 'Ошибка при обновлении товара' });
  }
});

// 🔹 Удалить товар
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json({ message: 'Товар удалён' });
  } catch (error) {
    console.error('Ошибка при удалении товара:', error);
    res.status(500).json({ error: 'Ошибка при удалении товара' });
  }
});

module.exports = router;
