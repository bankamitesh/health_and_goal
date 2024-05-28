const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const auth = require('../middleware/auth');

// Create Task
router.post('/', auth, async (req, res) => {
  const { goalId, title, quantity, frequency, reminders, autoTimeSuggestions } = req.body;
  try {
    const task = new Task({ goalId, title, quantity, frequency, reminders, autoTimeSuggestions });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tasks for a Goal
router.get('/:goalId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ goalId: req.params.goalId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
