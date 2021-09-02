import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory } from "react-router-dom";
import UiContext from "../../stores/ui/context";
import "./index.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
  },
});

const BottomNavigationComponent = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const {
    state: { page },
    toggleMenu,
  } = React.useContext(UiContext);

  const openPage = React.useCallback((path) => history.push(path), [history]);

  const switchMenu = (newValue, redirect = true) => {
    switch (newValue) {
      case "home":
        toggleMenu({
          page: newValue,
          title: "Home",
        });
        if (redirect) openPage("/");
        break;

      case "mylist":
        toggleMenu({
          page: newValue,
          title: "My List",
        });
        if (redirect) openPage("/mylist");
        break;

      default:
        toggleMenu({
          page: "",
          title: "Home",
        });
    }
  };

  const changeMenu = (event, newValue) => {
    switchMenu(newValue);
  };

  React.useEffect(() => {
    const {
      location: { pathname },
    } = history;
    let pathParams = "home";
    if (pathname !== "/") {
      pathParams = pathname.substr(1, pathname.length - 1);
    }
    switchMenu(pathParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomNavigation
      value={value}
      onChange={changeMenu}
      showLabels
      className={classes.root}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      value={page}
    >
      <BottomNavigationAction label="Home" value="home" icon={<SearchIcon />} />
      <BottomNavigationAction
        label="My List"
        value="mylist"
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNavigationComponent;
