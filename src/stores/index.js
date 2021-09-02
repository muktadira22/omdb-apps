import React from "react";
import MovieProvider from "./movie/provider";
import UiProvider from "./ui/provider";

const IndexStore = ({ children }) => {
  return (
    <UiProvider>
      <MovieProvider>{children}</MovieProvider>
    </UiProvider>
  );
};

export default IndexStore;
