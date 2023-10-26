const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  description: String,
  priority: {
    type: String,
    enum: ['Urgent', 'Normal', 'À Planifier'],
    default: 'Normal',
  },
  status: {
    type: String,
    enum: ['Done', 'In Progress'],
    default: 'Todo',
  },
  category: {
    type: String,
    enum: ['Design', 'Commercial', 'Developpement', 'Administratif'],
    default: 'Developpement',
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