import React from 'react'
import ThemeProvider from './theme/provider'

const IndexStore = ({ children }) => {

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export default IndexStore
