import React, { useState } from "react";
import Validation from "./Validation";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import axios from "axios";

const Registration = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    age: "null",
  });
  var [errors, setErrors] = useState({});
  var [loggedin, setloggedin] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    console.log("Values Added");
    console.log(values);
    
    //<Redirect to ="/About"/>

    axios
      .post("https://api-nodejs-todolist.herokuapp.com/user/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        age: values.age,
      })
      
      .then((response) => {
        console.log(response);
        console.log("Response sent");
        setloggedin(true);
      })
      .catch((err) => {
        console.log("UnAuthorized");
        console.log(err);
        
      });
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  if (loggedin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Create Account</h2>
        </div>
        <form className="form-wrapper">
          <div className="name">
            <label className="label">Full Name</label>
            <input
              className="input"
              type="text-box"
              name="name"
              placeholder="Type your Name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="email">
            <label className="label">Email</label>
            <input
              //id="email"
              className="input"
              type="email"
              name="email"
              placeholder="Type Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="password">
            <label className="label">Type Password</label>
            <input
              id="password"
              className="input"
              type="password"
              name="password"
              placeholder="Type Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="password">
            <label className="label">Type Age</label>
            <input
              className="input"
              type="number"
              name="age"
              placeholder="Type Age"
              value={values.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" className="submit" onClick={handleFormSubmit}>
              Sign up
            </button>
          </div>
        </form>
        <br />
        <div>
          Have Registered??<Link to="/">Login </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
