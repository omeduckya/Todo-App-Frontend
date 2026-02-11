import { useEffect, useState } from "react";
import "./App.css";
import TodoApp from "./Components/TodoApp";
import ThemeToggle from "./Components/ThemeToggle";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const nextTheme = savedTheme || "dark";
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <TodoApp />
    </>
  );
}

export default App;
