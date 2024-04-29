// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

export const AuthUser = createContext(null)

export const ThemeContext = createContext()
export const useTheme = () => {
  return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => sessionStorage.getItem('theme') || 'light');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    sessionStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>


      {children}

    </ThemeContext.Provider>
  )

}