// src/routes/methods.js
const express = require('express');
const Method = require('../models/method');
const router = express.Router();

// GET /api/methods → ALL categories
router.get('/', async (req, res) => {
  try {
    const methods = await Method.find({}, 'category sauce fillings method');
    const result = methods.reduce((acc, m) => {
      acc[m.category] = {
        sauce: m.sauce || '',
        fillings: m.fillings || '',
        method: m.method
      };
      return acc;
    }, {});
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch methods' });
  }
});

// GET /api/methods/:category → Single category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const method = await Method.findOne({ category: category.toLowerCase() });
    
    if (!method) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({
      sauce: method.sauce || '',
      fillings: method.fillings || '',
      method: method.method
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch method' });
  }
});

module.exports = router;
