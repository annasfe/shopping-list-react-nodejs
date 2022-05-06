import React, { useContext, useState, useEffect } from "react";
import { useLoader } from "./LoadContext";

const AuthenticationContext = React.createContext("");

const AuthenticationProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const { setLoading } = useLoader();

  async function getLoggedUser() {
    console.log("Getting user...")

    const response = await fetch("/users/", {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    });

    try {
      if(response.ok) {
        const data = await response.json();
        onLogin(data);
        setLoading(false);
        console.log("user data arrived", data);
        return data;
      }
        setLoading(false);
        throw new Error(response.statusText);
    } catch (error) {
        console.log(error)
        return null;
    }
}

useEffect(() => {
    getLoggedUser();
}, [setLoading]);

useEffect(() => {
  console.log("Now I get the authData!", authData);
}, [authData]);

  const onLogin = (value) => {setAuthData(value); console.log("auth data ", authData)}

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
