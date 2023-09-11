// employees.routes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newEmployee = new Employee({ firstName, lastName });
    await newEmployee.save();
    res.json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName },
        { new: true }
    );

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.id);

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
