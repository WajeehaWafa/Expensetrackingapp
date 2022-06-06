import React, { useState } from "react";
import Validation from "./Validation";
import axios from "axios";
import Home from "./Home";
import SaveIntoLocalStorage from "./SLocalstorage";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Registration from "./Registration";

const LoginForm = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  var [errors, setErrors] = useState({});
  var [Valid, setValid] = useState(false);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    console.log("Submitted");

    axios
      .post("https://expense-kamran.herokuapp.com/login", {
        name: values.name,
        password: values.password,
      })
      .then((response) => {
        //console.log(response);
        console.log("Login Response sent");
        SaveIntoLocalStorage(response.data);
        setValid(true);
      })
      .catch((err) => {
        console.log("UnAuthorized");
        console.log(err);
        <div>UnAuthorized</div>;
      });
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  if (Valid) {
    return <Redirect to="/Home"></Redirect>;
  }
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Login to existing Account</h2>
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
          <div className="password">
            <label className="label">Type Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Type Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <button className="submit" onClick={handleFormSubmit}>
              Login
            </button>
          </div>
          <br />
          <div>
            Not Registered yet?? <br />{" "}
            <Link className="App-link" to="Registration"> Registration </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
