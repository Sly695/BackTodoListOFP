const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You can add email validation logic here if needed
  },
  password: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    enum: ['Annecy', 'Lyon'],
    required: true,
  },
});

// Create the User model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
