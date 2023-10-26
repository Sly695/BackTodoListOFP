const mongoose = require('mongoose');

// Define the User schema
var usersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  region: String
});

// Create the User model
const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
