import React, { useContext, useState } from "react";

const LoadContext = React.createContext("");

const LoadContextProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(true);

  return (
    <LoadContext.Provider value={{isLoading, setLoading}}>
      {children}
    </LoadContext.Provider>
  );
};

export default LoadContextProvider;

export const useLoader = () => useContext(LoadContext);
