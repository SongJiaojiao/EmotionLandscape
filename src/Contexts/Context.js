import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {SignOut } from '@clerk/clerk-react';

export const AuthUser = createContext()

export const AuthUserProvider = ({ children }) => {
  const getAuthUserFromSessionStorage = () => {
    const storedUser = sessionStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : { email: null, firstName: null, lastName: null };
  };

  const [authUser, setAuthUser] = useState(getAuthUserFromSessionStorage);
  // const { signOut } = useSignOut();

  const updateAuthUser = useCallback((newAuthUser) => {
    setAuthUser(newAuthUser);
    sessionStorage.setItem('authUser', JSON.stringify(newAuthUser));
  }, []);

  // const handleSignOut = useCallback(async () => {
  //   await signOut();
  //   updateAuthUser({ email: null, firstName: null, lastName: null });
  // }, [signOut, updateAuthUser]);



  return (
    <AuthUser.Provider value={{ authUser, updateAuthUser }}>
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

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
  const getArrayFromSessionStorage = (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? storedValue.split(',') : [];
  };

  const [history, setHistory] = useState(() => getArrayFromSessionStorage('history'));

  const updateHistory = (newHistory) => {
    setHistory(newHistory);
  };
  return (
    <HistoryContext.Provider value={{ history, updateHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};