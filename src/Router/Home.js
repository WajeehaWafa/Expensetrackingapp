import react, { useState } from "react";
import axios from "axios";
import "./About";
import { Link, Redirect } from "react-router-dom";

function Home(response) {
  var [loggedOut, setloggedOut] = useState(false);
  
  const handleChange = (event) => {
    console.log("LogOut Response");
        
      localStorage.removeItem('userDetails');

    setloggedOut(true);
  };
  if (loggedOut) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Home">
      <h1>Home Page</h1>
      <p>This is my Home Page</p>
      <button to onClick={handleChange}>
        Logout
      </button>
    </div>
  );
}

export default Home;
