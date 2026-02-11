import { useState, useEffect } from "react";
import TasksContainer from "./TasksContainer";
import TaskForm from "./TaskForm";
import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(
  /\/$/,
  "",
);
const API_URL =
  configuredApiUrl || (import.meta.env.DEV ? "http://localhost:5700" : "");
const VERSION = import.meta.env.VITE_VERSION || "blue";

if (!API_URL) {
  console.error(
    "Missing VITE_API_URL for production build. Set it in your build environment and redeploy the frontend.",
  );
}

export default function TodoApp() {
  const [response, setResponse] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    handleTasks();
  }, [response, isCompleted]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleTasks = async () => {
    if (!API_URL) {
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/tasks/`);
      setTasks(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleCreateTask();
  };

  const handleCreateTask = async () => {
    if (!API_URL) {
      return;
    }

    try {
      await axios.post(`${API_URL}/tasks/`, task).then((res) => {
        setResponse(res.data.message);
      });
      await setTask({
        title: "",
        description: "",
        completed: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!API_URL) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/tasks/${id}`).then((res) => {
        setResponse(res.data.message);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCompleted = async (id) => {
    if (!API_URL) {
      return;
    }

    const task = tasks.find((task) => task._id === id);
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await axios.put(`${API_URL}/tasks/${id}`, updatedTask).then((res) => {
        setIsCompleted(!isCompleted);
        setResponse(res.data.message);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="todo-app">
        <header className="todo-header">
          <h1 style={{ color: VERSION === "blue" ? "#0e7490" : "#0f766e" }}>
            Todo App
          </h1>
          <p className="todo-subtitle">
            Organize work with clear, focused task cards.
          </p>
        </header>
      </div>
      {!API_URL && (
        <p style={{ color: "#e74c3c", fontWeight: 600 }}>
          API URL is not configured. Set VITE_API_URL and redeploy this
          frontend.
        </p>
      )}
      <TaskForm
        task={task}
        handleChange={handleChange}
        handleOnSubmit={handleOnSubmit}
      />
      <TasksContainer
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleChangeCompleted={handleChangeCompleted}
      />
    </>
  );
}
