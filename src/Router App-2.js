import "./App.css";
import React from "react";
import Home from "./Router/Home.js";
import About from "./Router/About.js";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>There Are 2 links on this page</h1>
      <Router>
        <h3>Go to any link blew</h3>
        <nav exact={false}>
          <Link to="/home">Home</Link>
          <br></br>
          <Link to="/about">About</Link>
        </nav>
        <Route path="/home">
          {" "}
          <Home />
        </Route>
        <Route path="/about">
          {" "}
          <About />
        </Route>
      </Router>
    </div>
  );
}

export default App;
