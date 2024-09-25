import { useState } from 'react';
import './TodoList.css'; // Ensure this CSS file is created

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, status: 'to do' }]);
      setInputValue('');
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="todo-list">
      <h2>Tasks</h2>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={addTask}>Add Task</button>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <span className="task-text">{task.text}</span>
            <div className="button-group">
              <button onClick={() => updateTaskStatus(task.id, 'to do')}>To Do</button>
              <button onClick={() => updateTaskStatus(task.id, 'in progress')}>Progress</button>
              <button onClick={() => updateTaskStatus(task.id, 'completed')}>Completed</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;