import React from "react";
import ThemeContext from "./context";

const UiProvider = ({ children }) => {
  const [state, setState] = React.useState({
    page: "home",
    title: "Home",
  });

  const toggleMenu = ({ page, title }) => {
    setState({ ...state, page, title });
  };

  return (
    <ThemeContext.Provider
      value={{
        state,
        toggleMenu,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default UiProvider;
