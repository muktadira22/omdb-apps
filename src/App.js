import "./App.css";
import React from "react";
import HomeContainer from "./containers/Home";
import MyListContainer from "./containers/MyList";
import DetailContainer from "./containers/Detail";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomeContainer} exact />
      <Route path="/mylist" component={MyListContainer} exact />
      <Route path="/:id" component={DetailContainer} exact />
    </Switch>
  );
}

export default App;
