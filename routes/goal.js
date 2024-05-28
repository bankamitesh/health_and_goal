const express = require('express');
const Goal = require('../models/Goal');
const router = express.Router();
const auth = require('../middleware/auth');

// Create Goal
router.post('/', auth, async (req, res) => {
  const { title, description, minTimeline, maxTimeline } = req.body;
  try {
    const goal = new Goal({ userId: req.user.userId, title, description, minTimeline, maxTimeline });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User Goals
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
