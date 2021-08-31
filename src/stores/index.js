import React from 'react'
import MovieProvider from './movie/provider'
import ThemeProvider from './theme/provider'

const IndexStore = ({ children }) => {

  return (
    <ThemeProvider>
      <MovieProvider>
        {children}
      </MovieProvider>
    </ThemeProvider>
  )
}

export default IndexStore
