import React from "react";
import axios from "axios";

function Axs() {
  const Fetch = () => {
    axios
      .post("https://api-nodejs-todolist.herokuapp.com/user/register", {
        name: "Muhammad Nur Ali",
        email: "4387687688656564@gmail.com",
        password: "12345678",
        age: 20,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      APP
      <button onClick={Fetch}>FetchData</button>
    </div>
  );
}
export default Axs;
