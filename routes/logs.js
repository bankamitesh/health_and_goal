const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Log = require('../models/Log');

// Get logs by user
router.get('/', auth, async (req, res) => {
  try {
    const logs = await Log.find({ user_id: req.user.id });
    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Create a new log
router.post('/', auth, async (req, res) => {
  const { goal_id, task_id, log_entry } = req.body;
  try {
    const log = new Log({ user_id: req.user.id, goal_id, task_id, log_entry });
    await log.save();
    res.json(log);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
