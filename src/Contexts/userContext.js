import React, { createContext, useState, useCallback } from 'react';

export const AuthUser = createContext();

export const AuthUserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({ email: null, firstName: null, lastName: null });

  const updateAuthUser = useCallback((newAuthUser) => {
    setAuthUser(newAuthUser);
  }, []);


  return (
    <AuthUser.Provider value={{ authUser, updateAuthUser }}>
      {children}
    </AuthUser.Provider>
  );
};
