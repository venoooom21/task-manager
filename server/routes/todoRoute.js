// routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/todo"); // Import the todo model

// Endpoint to get to-do statistics
router.get("/stats", async (req, res) => {
  try {
    const totalTodos = await Todo.countDocuments(); // Total todos
    const completedTodos = await Todo.countDocuments({ completed: true }); // Completed todos
    const inProgressTodos = totalTodos - completedTodos; // In progress = total - completed

    res.json({
      totalTodos,
      completedTodos,
      inProgressTodos,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
const getDateRange = (days) => {
    const now = new Date();
    const start = new Date();
    start.setDate(now.getDate() - days);
    return { start, end: now };
  };
  
  // Endpoint to get completed tasks over different time ranges
  router.get("/completed-stats", async (req, res) => {
    try {
      const todayRange = getDateRange(1);
      const weekRange = getDateRange(7);
      const monthRange = getDateRange(30);
  
      const completedToday = await Todo.countDocuments({
        completed: true,
        updatedAt: { $gte: todayRange.start, $lte: todayRange.end },
      });
  
      const completedThisWeek = await Todo.countDocuments({
        completed: true,
        updatedAt: { $gte: weekRange.start, $lte: weekRange.end },
      });
  
      const completedThisMonth = await Todo.countDocuments({
        completed: true,
        updatedAt: { $gte: monthRange.start, $lte: monthRange.end },
      });
  
      res.json({
        completedToday,
        completedThisWeek,
        completedThisMonth,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;
