'use client';
import React, { createContext, useState } from 'react';

const ThemeContext = createContext({
  theme: { headerTheme: 'g100', contentTheme: 'g10', sideNavTheme: 'g90' },
  setTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    headerTheme: 'g100',
    contentTheme: 'g10',
    sideNavTheme: 'g90',
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
