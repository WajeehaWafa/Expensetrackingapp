import "./App.css";
import React from "react";
import Home from "./Router/Home";
import LoginForm from "./Router/About";
import Registration from "./Router/Registration";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route path="/Registration">
            <Registration />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
