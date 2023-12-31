const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');
let bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

/* GET users listing. */
router.get('/', (req, res) => {
  const aboutPath = path.resolve(__dirname, 'FrontTodolistOFP', 'sign_in', 'index.html');
  res.sendFile(aboutPath);
});

router.get('/signin', async (req, res) => {
  try {
    const { email, password } = req.query;

    // Find a user with the provided email and password
    const user = await usersModel.findOne({ email });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.json({ message: 'Succès de la connexion', user: user});
      } else {
        res.json({ message: 'Mot de passe incorrect' });
      }
    } else {
      // User not found or incorrect credentials
      res.status(401).json({ message: `L'utilisateur n'existe pas` });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/signup', async (req, res) => {
  const { username, email, password, region } = req.body;
  const schema = new passwordValidator();
  const salt = 10;
  schema
    .is().min(8)           // Minimum length 8
    .is().max(100)         // Maximum length 100
    .has().digits()        // Must have digits
    .has().symbols();      // Must have symbols

  //Validate a password
  const passwordToCheck = password;
  const isValid = schema.validate(passwordToCheck);

  // Get a list of failed rules
  const failedRules = schema.validate(passwordToCheck, { list: true });

  let hash = bcrypt.hashSync(password, salt);

  if (isValid) {
    try {
      // Check if the user already exists with the provided email
      const existingUser = await usersModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: `L'utilisateur existe déjà.` });
      }
  
      // Create a new user
      const newUser = new usersModel({
        username: username,
        email: email,
        password: hash, // In a production environment, you should hash the password before storing it
        region: region,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Send a success message
      res.json({ message: 'Nouvel utilisateur crée avec succès', user: newUser  });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.json({ message: `Le mot de passe ne respecte pas les exigeances : ${failedRules}` 
  });
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
