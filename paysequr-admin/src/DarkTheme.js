import { useState, useEffect } from 'react';

function useDarkTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || false;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  return { isDarkMode, toggleTheme };
}

export default useDarkTheme;
