const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  region: {
    type: String,
    enum: ['Annecy', 'Lyon'],
  },
  role: {
    type: String,
    default: "Collaborateur",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
