import React  from 'react';
import Axios from 'axios';

function Axs() {
  const Fetch = () => {
    Axios.get("https://api-nodejs-todolist.herokuapp.com/user/me")
    .than((response) => {
        console.log(response);
    });
  };
  return (
    <div>
      APP
      <button onClick={Fetch}>FetchData</button>
    </div>
  );
};
export default Axs;
