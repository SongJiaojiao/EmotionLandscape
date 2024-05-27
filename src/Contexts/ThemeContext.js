// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

export const AuthUser = createContext()

export const AuthUserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(false); // Initial value set to true

  return (
      <AuthUser.Provider value={{ authUser, setAuthUser }}>
          {children}
      </AuthUser.Provider>
  );
};

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