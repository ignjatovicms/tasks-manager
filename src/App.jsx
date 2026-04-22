import "./App.css";
import { useState, useEffect } from "react";
import { FaPlus, FaList, FaClock, FaCheck, FaTrash, FaSquare, FaCheckSquare } from "react-icons/fa";
function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
    // [] - Load just once when the app is loading
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

useEffect(() => {
// Whenever tasks change(add, delete, check) auto save it in local Storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);  // Save when tasks change

  function addTask(){
    if (input.trim() === "") return;

    const newTask = { text:input, done: false };

    setTasks([...tasks, newTask]);
    setInput("");
  }

function deleteTask(index) {
  const updatedTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (i !== index) {
      updatedTasks.push(tasks[i]);
    }
  }

  setTasks(updatedTasks);
}

function toggleTask(index) {
  const updatedTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    // Create a new array to keep state immutable
    const task = tasks[i];

    if (i === index) // Check if this is the task we want to toggle
    {
      // Add a new object with the updated 'done' value
      updatedTasks.push({ 
        text: task.text,
        done: !task.done //switches true <-> false
      });
    } else {
      // Keep other tasks unchanged
      updatedTasks.push(task);
    }
  }
  // Update the state with the new tasks array
  setTasks(updatedTasks);
}

let filteredTasks = tasks; // By default show all
if (filter === "active") { // If filter is active show only unfinished
  filteredTasks = tasks.filter(task => task.done === false)
}

if (filter === "done") { // If filter is done show only done 
  filteredTasks = tasks.filter(task => task.done === true)
}

  return (
    <div>
      <h1 className="title">Tasks Manager</h1>
    <div className="container">
          <div className="input-row">
            <input className="input"
              value = {input}
              onChange = { (e) => setInput(e.target.value) }
              placeholder = "Add a task..."
            />
            <button className="add-btn" onClick = {addTask}>
              <FaPlus />
            </button>
          </div>

          <ul className="task-list">
            { filteredTasks.map((task, index) => (
            <li className="task-item"
            key={index}
            style={{ // If task is done - line-through else none
              textDecoration: task.done ? "line-through" : "none",
            }}
            >
            <span className="task-text">
              {task.text /* Text */ }
            </span>
            
            <div className="task-actions"> 
              <button className="btn-check" onClick={(e) => { // Check icon button
                e.stopPropagation();
                  toggleTask(index);
                }}
                >
                {task.done? <FaCheckSquare /> : <FaSquare />}
              </button>

              <button className="btn-delete" onClick={(e) => {
                // Stops the click from triggering the parent <li> onClick handler.
                e.stopPropagation();
                deleteTask(index)}}
                >
                <FaTrash />
              </button>
            </div>
            </li>
            ))}
          </ul>

          <div className="btn-container">
            <button className="btn-all" onClick={() => setFilter("all")}>
              <FaList /> All
            </button>
            <button className="btn-active" onClick={() => setFilter("active")}>
              <FaClock /> Active
            </button>
            <button className="btn-done" onClick={() => setFilter("done")}>
              <FaCheck /> Done
            </button>
          </div>
    </div>
  </div>
  );
}

export default App;