const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Get tasks by goal
router.get('/:goal_id', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ goal_id: req.params.goal_id });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  const { goal_id, title, description, quantity, frequency, days_of_week, reminder_time } = req.body;
  try {
    const task = new Task({ goal_id, title, description, quantity, frequency, days_of_week, reminder_time });
    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  const { title, description, quantity, frequency, days_of_week, reminder_time } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.quantity = quantity;
    task.frequency = frequency;
    task.days_of_week = days_of_week;
    task.reminder_time = reminder_time;
    task.updated_at = Date.now();

    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
