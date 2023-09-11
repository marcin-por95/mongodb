// products.routes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name, client });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, client },
        { new: true }
    );

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
