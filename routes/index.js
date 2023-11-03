const router = require("express").Router();
const taskModel = require('../models/tasks')
const mongoose = require('mongoose')

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.json({message: 'yes'})
});

router.post('/addTask', async (req, res) => {
  try {
    const { description, priority, status, category } = req.body;
    console.log("first")
    console.log(req.body)

    // Create a new task instance
    const newTask = new taskModel({ description, priority, status, category });

    // Save the task to the database
    await newTask.save();

    // Respond with a success message or the newly created task
    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/getTasks', async function (req, res, next) {
  try {
    const users = await taskModel.find();;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/updateTask', async (req, res) => {
  try {

    const { id, description, priority, status, category } = req.body;

    // Find the task by ID
    const task = await taskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task fields
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.category = category || task.category;

    // Save the updated task
    const newTask = await task.save();

    console.log(newTask)

    // Respond with a success message or the updated task
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/deleteTask', async (req, res) => {
  try {
    const deletedTask = await taskModel.deleteOne({_id: req.query.id});

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Respond with a success message or the deleted task
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
