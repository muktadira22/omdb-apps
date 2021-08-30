import React from 'react'
import ThemeContext from "./context";

const ThemeProvider = ({ children }) => {
  const initialTheme = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  }
  const [state, setState] = React.useState(initialTheme.light)
  return (
    <ThemeContext.Provider value={{
      state,
      toggleTheme: (selected) => {
        setState((prevState) => JSON.stringify(prevState) === JSON.stringify(initialTheme.light) ? initialTheme.dark : initialTheme.light)
      }
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
