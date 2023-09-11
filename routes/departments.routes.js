const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const Department = require('../models/department.model');


const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Department', departmentSchema);

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {

  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.get('/departments/:id', async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.post('/departments', async (req, res) => {

  try {

    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (updatedDepartment) {
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndRemove(req.params.id);
    if (deletedDepartment) {
      res.json(deletedDepartment);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;