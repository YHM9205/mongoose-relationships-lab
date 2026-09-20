const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up');
});

router.post('/sign-up', async (req, res) => {
  try {
    const { username, password, confirmPassword } = confirmPassword;

    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.send('Username already taken');
    }

    if (password !== confirmPassword) {
      return res.send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);


    res.redirect('/users/sign-in');
  } catch (error) {
    res.send('Error: ' + error.message);
  }
});

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in');
});

router.post('/sign-in', async (req, res) => {
  try {
    const { username, password } = req.body;

    const userInDatabase = await User.findOne({ username });
    if (!userInDatabase) {
      return res.send('username allready in use! please try again');
    }

    const validPassword = bcrypt.compare(password, userInDatabase.password);
    if (!validPassword) {
      return res.redirect('/auth/sing-in');
    }
  } catch (error) {
    return res.send('WRONG PASSWORD!please try again')
  }
});

module.exports = router;