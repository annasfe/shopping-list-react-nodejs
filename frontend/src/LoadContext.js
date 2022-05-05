import React, { useContext, useState, useEffect } from "react";

const LoadContext = React.createContext("");

const LoadContextProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
}, []);

  return (
    <LoadContext.Provider value={isLoading}>
      {children}
    </LoadContext.Provider>
  );
};

export default LoadContextProvider;

export const useLoader = () => useContext(LoadContext);
