const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/Goal');

// Get user goals
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ email: req.user.email });
    res.json(goals);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Create a new goal
router.post('/', auth, async (req, res) => {
  const { title, description, min_timeline, max_timeline, user_timeline } = req.body;
  try {
    const goalCount = await Goal.countDocuments({ user_id: req.user.id });
    if (goalCount >= 2) {
      return res.status(400).json({ msg: 'Each user can only set up to 2 goals' });
    }

    const goal = new Goal({ user_id: req.user.id, title, description, min_timeline, max_timeline, user_timeline });
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Update a goal
router.put('/:id', auth, async (req, res) => {
  const { title, description, min_timeline, max_timeline, user_timeline } = req.body;
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ msg: 'Goal not found' });
    }

    goal.title = title;
    goal.description = description;
    goal.min_timeline = min_timeline;
    goal.max_timeline = max_timeline;
    goal.user_timeline = user_timeline;
    goal.updated_at = Date.now();

    await goal.save();
    res.json(goal);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Delete a goal
router.delete('/:id', auth, async (req, res) => {
  try {
    await Goal.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Goal removed' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
