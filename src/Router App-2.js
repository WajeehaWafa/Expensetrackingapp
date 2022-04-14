import "./App.css";
import React from "react";
import Home from "./Router/Home";
import About from "./Router/About";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <Router>
          <Link to="/Home">Home Pages</Link>
          <br></br>
          <Link to="About">About Page </Link>
        

        <Route path="/Home">
          Component={Home}
        </Route>
        <Route path="/About">
          {" "}
          <About />
        </Route>
      </Router>
    </div>
  );
}

export default App;
