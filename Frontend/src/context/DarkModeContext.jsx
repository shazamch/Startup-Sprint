import React, { createContext, useContext, useState } from 'react';

// Create the Dark Mode Context
const DarkModeContext = createContext();

// Custom hook for consuming the Dark Mode context
export const useDarkMode = () => useContext(DarkModeContext);

// Provider component to wrap the app
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
