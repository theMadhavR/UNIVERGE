import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Save to PostgreSQL database if logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        await api.put('/api/users/theme', { theme: newTheme });
      } catch (err) {
        console.error('Failed to save theme setting to database:', err);
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  // Sync theme when user logs in/restores and triggers 'theme-changed' event
  useEffect(() => {
    const handleThemeChange = () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme && storedTheme !== theme) {
        setThemeState(storedTheme);
      }
    };
    
    window.addEventListener('theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, [theme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
