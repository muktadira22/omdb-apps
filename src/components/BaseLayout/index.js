import Container from '@material-ui/core/Container'
import React from 'react'
import AppBarComponent from '../AppBar'
import BottomNavigation from '../BottomNavigation'

const BaseLayout = ({ children }) => {
  return (
    <div>
      <AppBarComponent />
      <Container fixed maxWidth={"sm"}>
        <div style={{ margin: "10px", paddingBottom: "80px" }}>{children}</div>
      </Container>
      <BottomNavigation />
    </div>
  )
}

export default BaseLayout
