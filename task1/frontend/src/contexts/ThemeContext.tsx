import type React from "react";
import { useEffect, useState } from "react";
import { ThemeContext } from "../constants";
import { Theme } from "../types";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [theme, setTheme] = useState<Theme>("light");

   useEffect(() => {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme) {
         setTheme(savedTheme);
      }
   }, []);

   useEffect(() => {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
   }, [theme]);

   const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
   };

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};
