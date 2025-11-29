// server/routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import our Task blueprint

// --- C.R.U.D. Operations ---

// GET ALL TASKS (Read)
// "HQ, give me a sitrep on all objectives."
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 }); // Sort by deadline
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error: Cannot fetch tasks." });
  }
});

// CREATE A NEW TASK (Create)
// "HQ, logging a new objective."
router.post('/', async (req, res) => {
  // The POST route now accepts more data
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
    link: req.body.link
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: "Error: Cannot create task." });
  }
});

// **NEW** UPDATE A TASK (Update)
// "HQ, objective parameters have changed. Pushing new data."
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body, { new: true } // { new: true } returns the updated document
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: "Error: Could not update task." });
  }
});


// DELETE A TASK (Delete)
// "HQ, this objective is compromised. Terminate it."
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task successfully terminated." });
  } catch (err) {
    res.status(500).json({ message: "Error: Could not terminate task." });
  }
});

module.exports = router;