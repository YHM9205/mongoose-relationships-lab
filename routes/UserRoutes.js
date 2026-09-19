const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password, confirmPassword, email, age } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('Username already taken');
    }

    if (password !== confirmPassword) {
      return res.send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email: email || `${username}@example.com`,
      password: hashedPassword,
      age: Number(age || 18),
      role: req.body.role || 'tenant'
    });

    res.redirect('/users/login');
  } catch (error) {
    res.send('Error: ' + error.message);
  }
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/users/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect('/users/login');
    }

    req.session.user = user;
    res.redirect('/listings');
  } catch (error) {
    res.send('Error: ' + error.message);
  }
});

module.exports = router;