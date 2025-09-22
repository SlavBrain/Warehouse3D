const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'secretkey';

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Пользователь создан' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Вход
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Неверные данные' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;
