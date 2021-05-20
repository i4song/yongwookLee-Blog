import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Card from "./pages/Card";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/yongwookLee-Blog" component = {Home}/>
        <Route path="/react-spring/Card" component = {Card}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
