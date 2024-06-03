const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: password,
      });
  
      await newUser.save();
      console.log(newUser);
      const token = jwt.sign({ id: newUser.email }, "jwtsecret", {
        expiresIn: '1h',
      });
  
      res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        console.log("User not found")
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    console.log(user.password);
    const isMatch = password == user.password;
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    console.log(payload);
    jwt.sign(payload, 'jwtsecret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
