// server/models/Task.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The UPGRADED blueprint for a mission objective
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Done'],
    default: 'To-Do'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  deadline: {
    type: Date,
    default: null
  },
  link: {
    type: String,
    default: ""
  },
  timeSpent: { // in hours
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);