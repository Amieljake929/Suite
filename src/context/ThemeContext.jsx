import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  // Pass the click event so the circle grows from the toggle button
  const toggleTheme = useCallback(
    (event) => {
      const next = theme === "dark" ? "light" : "dark";
      const apply = () => {
        // toggle the class synchronously so the view transition captures the new theme
        document.documentElement.classList.toggle("dark", next === "dark");
        setTheme(next);
      };

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || reduceMotion || !event) return apply();

      // Origin = center of the button that was pressed (falls back to the pointer position)
      const rect = event.currentTarget.getBoundingClientRect();
      let x = rect.left + rect.width / 2;
      let y = rect.top + rect.height / 2;
      if (!rect.width && event.clientX) {
        x = event.clientX;
        y = event.clientY;
      }

      // Size the circle so it always covers the whole screen (with a little extra for mobile toolbars)
      const vw = Math.max(window.innerWidth, document.documentElement.clientWidth);
      const vh = Math.max(window.innerHeight, document.documentElement.clientHeight);
      const radius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y)) * 1.1;

      // The animation itself lives in index.css and reads these variables
      const root = document.documentElement;
      root.style.setProperty("--vt-x", `${x}px`);
      root.style.setProperty("--vt-y", `${y}px`);
      root.style.setProperty("--vt-start", `${Math.max(rect.width, 24) / 2}px`);
      root.style.setProperty("--vt-r", `${radius}px`);

      document.startViewTransition(apply);
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);