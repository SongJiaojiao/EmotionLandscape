import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { json } from 'react-router-dom';

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




export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
  const getArrayFromSessionStorage = (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  };

  const [history, setHistory] = useState(() => getArrayFromSessionStorage('history'));

  const updateHistory = (newHistory) => {
    setHistory(newHistory);
    sessionStorage.setItem('history', JSON.stringify(newHistory));

  };
  const fetchData = async (email) => {
    try {
      console.log('call fetch data api', 'email', email);
      const response = await fetch(`${API_URL}/get_transcripts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      updateHistory(jsonData)
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };


  return (
    <HistoryContext.Provider value={{ history, updateHistory, fetchData }}>
      {children}
    </HistoryContext.Provider>
  );
};