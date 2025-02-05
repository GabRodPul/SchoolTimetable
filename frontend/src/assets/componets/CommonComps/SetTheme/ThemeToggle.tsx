import { useEffect, useState } from "react";
import "./ThemeToggleStyles.css"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Cambia el modo y almacena la preferencia
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button className="ToggleTheme__button" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
};

export default ThemeToggle;
