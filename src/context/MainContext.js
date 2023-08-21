// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <MainContext.Provider value={{ isSearch, setIsSearch }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
