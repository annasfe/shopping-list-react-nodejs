import React, { useContext, useState, useEffect } from "react";

const AuthenticationContext = React.createContext("");

const AuthenticationProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});

  async function getLoggedUser() {
    const response = await fetch(`/users/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    });

    try {
        const data = await response.json();
        onLogin(data);
    } catch {
        return null;
    }
}

useEffect(() => {
    getLoggedUser();
}, []);

  const onLogin = (value) => setAuthData(value);

  const onLogout = () => setAuthData({});

  const value = {
    authData,
    onLogin,
    onLogout
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;

export const useAuthentication = () => useContext(AuthenticationContext);
