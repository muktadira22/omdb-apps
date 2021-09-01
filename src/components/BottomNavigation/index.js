import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import "./index.css"

const useStyles = makeStyles({
  root: {
    width: "100%",
    bottom: 0,
    position: 'fixed'
  },
});

const BottomNavigationComponent = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<SearchIcon />} />
      <BottomNavigationAction label="My List" icon={<FavoriteIcon />} />
    </BottomNavigation>
  )
}

export default BottomNavigationComponent
