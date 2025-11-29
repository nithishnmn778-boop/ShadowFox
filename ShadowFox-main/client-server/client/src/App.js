// client/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5001/api/tasks';

// --- Helper function to format dates for input fields ---
const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
};

function App() {
  // --- State Management ---
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // The task being edited
  const [view, setView] = useState('all'); // 'all' or 'today'

  // --- Initial Data Fetch ---
  useEffect(() => {
    fetchTasks();
  }, []);

  // --- API Communications ---
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) { console.error("Transmission Error - Cannot fetch tasks:", error); }
  };

  const addTask = async (e) => {
    e.preventDefault();
    const { title, description, deadline, priority, link } = e.target.elements;
    if (!title.value.trim()) return;

    const newTaskPayload = {
      title: title.value,
      description: description.value,
      deadline: deadline.value ? new Date(deadline.value) : null,
      priority: priority.value,
      link: link.value
    };

    try {
      const response = await axios.post(API_URL, newTaskPayload);
      setTasks([response.data, ...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
      e.target.reset(); // Clear the form
    } catch (error) { console.error("Transmission Error - Cannot add task:", error); }
  };

  const updateTask = async (taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${taskData._id}`, taskData);
      setTasks(tasks.map(task => task._id === taskData._id ? response.data : task));
      closeModal();
    } catch (error) { console.error("Transmission Error - Cannot update task:", error); }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to terminate this objective?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (error) { console.error("Transmission Error - Cannot delete task:", error); }
    }
  };

  // --- Modal Controls ---
  const openModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    updateTask(currentTask);
  };

  // --- Filtering Logic ---
  const getFilteredTasks = () => {
    if (view === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Start of tomorrow

      return tasks.filter(task => {
        if (!task.deadline) return false;
        const taskDeadline = new Date(task.deadline);
        return taskDeadline >= today && taskDeadline < tomorrow;
      });
    }
    return tasks;
  };

  return (
    <div className="app-container">
      {/* --- Header --- */}
      <header className="app-header">
        <h1><span role="img" aria-label="phoenix">🔥</span> Phoenix Dashboard</h1>
        <div className="view-toggle">
          <button onClick={() => setView('all')} className={view === 'all' ? 'active' : ''}>All Objectives</button>
          <button onClick={() => setView('today')} className={view === 'today' ? 'active' : ''}>Today's Targets</button>
        </div>
      </header>
      
      {/* --- New Task Form --- */}
      <details className="add-task-details">
        <summary>Log New Objective</summary>
        <form onSubmit={addTask} className="task-form-grid">
            <input name="title" type="text" placeholder="Objective Title*" required className="span-2"/>
            <textarea name="description" placeholder="Mission Briefing..." rows="3" className="span-2"></textarea>
            <input name="deadline" type="date" title="Deadline"/>
            <select name="priority" defaultValue="Medium">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <input name="link" type="url" placeholder="https://resource.link" className="span-2"/>
            <button type="submit" className="span-2">Commit Objective</button>
        </form>
      </details>

      {/* --- Task List --- */}
      <div className="task-list">
        {getFilteredTasks().map(task => (
          <div key={task._id} className={`task-card priority-${task.priority.toLowerCase()}`}>
            <div className="task-card-header">
              <h3>{task.title}</h3>
              <span className={`status status-${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</span>
            </div>
            {task.description && <p className="task-description">{task.description}</p>}
            <div className="task-meta">
              <span><strong>Deadline:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</span>
              <span><strong>Time Logged:</strong> {task.timeSpent} hrs</span>
            </div>
            {task.link && <a href={task.link} target="_blank" rel="noopener noreferrer" className="task-link">Resource Link</a>}
            <div className="task-actions">
              <button onClick={() => openModal(task)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => deleteTask(task._id)} className="action-btn delete-btn">Terminate</button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Edit Modal --- */}
      {isModalOpen && currentTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Edit Objective</h2>
            <form onSubmit={handleModalSubmit}>
              <label>Title</label>
              <input name="title" type="text" value={currentTask.title} onChange={handleModalChange} required />
              
              <label>Description</label>
              <textarea name="description" value={currentTask.description} onChange={handleModalChange} rows="4"></textarea>

              <div className="form-row">
                <div>
                  <label>Status</label>
                  <select name="status" value={currentTask.status} onChange={handleModalChange}>
                    <option>To-Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
                <div>
                  <label>Deadline</label>
                  <input name="deadline" type="date" value={formatDateForInput(currentTask.deadline)} onChange={handleModalChange} />
                </div>
              </div>
              
              <div className="form-row">
                 <div>
                    <label>Priority</label>
                    <select name="priority" value={currentTask.priority} onChange={handleModalChange}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div>
                  <label>Time Spent (hrs)</label>
                  <input name="timeSpent" type="number" step="0.5" min="0" value={currentTask.timeSpent} onChange={handleModalChange} />
                </div>
              </div>
              
              <label>Resource Link</label>
              <input name="link" type="url" value={currentTask.link} onChange={handleModalChange} placeholder="https://..."/>

              <div className="modal-actions">
                <button type="button" onClick={closeModal}>Cancel</button>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;