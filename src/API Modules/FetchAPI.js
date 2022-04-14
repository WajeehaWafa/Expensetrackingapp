import React, {useState,useEffect} from "react";

function FetchApi() {

    const [setUser] = useState([]);

    const fetchData =()=>{
        fetch("https://api-nodejs-todolist.herokuapp.com/user/me")
        .then((response) =>{
            return response.json();
        }).then((data)=>{
            let gagan = data.results
            console.log(gagan);
            setUser(gagan)
        })
    }
    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div >
        <button onClick={fetchData}> Fetch Data</button>

      </div>
    )
}


export default FetchApi;