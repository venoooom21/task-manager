import React, { useState } from 'react';
import './taskApp.css'; // Import your CSS file
import { FaTrash } from 'react-icons/fa'; // Import a delete icon
import { FaClock } from 'react-icons/fa';
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [importance, setImportance] = useState('Not Started'); // New state for importance

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      name: taskName,
      description: description,
      deadline: deadline,
      importance: importance, // Include importance in the task object
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setDescription('');
    setDeadline('');
    setImportance('Not Started'); // Reset importance
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <MDBox mt={4}>
      <Grid container spacing={3}>
        {
    <div className="task-app">
      <form className="task-form" onSubmit={handleAddTask}>
        <div>
          <p>Title</p>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Date Picker</p>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Importance</p>
          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Add New Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <div className="task-content">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </div>
            <div className="deadline">
              <div className="date">
                <FaClock className="clock-icon" />
                <p>{task.deadline}</p>
              </div>
              <div className='importante'>
              <div className="importance">
                <p>{task.importance}</p> {/* Display the importance status */}
              </div>
              <FaTrash
                className="delete-icon"
                onClick={() => handleDeleteTask(index)}
              />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    }
    </Grid>
  </MDBox>
</DashboardLayout>
  );
};

export default TaskApp;
