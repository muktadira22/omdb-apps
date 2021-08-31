import React from 'react'
import AppBarComponent from '../AppBar'
import BottomNavigation from '../BottomNavigation'

const BaseLayout = ({ children }) => {
  return (
    <div>
      <AppBarComponent />
      <div style={{ margin: "10px", paddingBottom: "80px" }}>{children}</div>
      <BottomNavigation />
    </div>
  )
}

export default BaseLayout
