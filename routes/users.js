var express = require('express');
var router = express.Router();
const usersModel = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', async function (req, res, next) {
  try {
    const newUser = await usersModel.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/signup', async (req, res) => {
  const { username, email, password, region } = req.body;

  try {
    // Check if the user already exists with the provided email
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password, // In a production environment, you should hash the password before storing it
      region,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success message
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/listUsers', async function (req, res, next) {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
