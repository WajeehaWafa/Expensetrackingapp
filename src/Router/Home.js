import react, {useState} from "react";
import App from "../App";
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";

function Home() {
  var [loggedOut, setloggedOut] = useState(false);
  const handleChange = (event) => {

    axios
    .post("https://api-nodejs-todolist.herokuapp.com/user/register", {
      

    })
    .then((response) => {
      console.log(response);
      console.log("Response sent");
    })
    .catch((err) => {
      console.log(err);
    });

    setloggedOut(true);
    
  };
  if (loggedOut) {
    return <Redirect to="/APP"/>
    
  }
  
    return (
      <div className="Home">
        <h1>Home Page</h1>
        <p>This is my Home Page</p>
        <Link to onClick={handleChange}>Logout</Link> 

        


      </div>
    )
  }

export default Home;