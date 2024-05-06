'use client';
import React, { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: { headerTheme: 'white', contentTheme: 'white', sideNavTheme: 'white' },
  setTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    headerTheme: 'white',
    contentTheme: 'white',
    sideNavTheme: 'white',
  });

  useEffect(() => {
    console.log('kkkkkkkkkkkkk');
  },[])
console.log(3333333333333);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
