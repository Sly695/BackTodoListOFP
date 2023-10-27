const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['Urgent', 'Normal', 'À Planifier'],
  },
  status: {
    type: String,
    enum: ['Done', 'In Progress'],
  },
  category: {
    type: String,
    enum: ['Design', 'Commercial', 'Developpement', 'Administratif'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

// Export the model
module.exports = Task;