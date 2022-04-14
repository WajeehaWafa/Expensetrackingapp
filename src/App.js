import "./App.css";
import React from "react";
import Home from "./Router/Home";
import LoginForm from "./Router/About";
import Registration from "./Router/Registration";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div>
      
      <Router>
          <div> Not Registered Yet?? <Link exact to="/Registration"> Signup</Link></div>
           
          <br></br>
          <div> Have Registered??<Link to="LoginForm">Login </Link> </div>
        <Switch>
        <Route path="/Home">
          {" "}
          <Home />
        </Route>
        <Route path="/LoginForm">
          {" "}
          <LoginForm />
        </Route>
        <Route path="/Registration">
          {" "}
          <Registration />
        </Route>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;


