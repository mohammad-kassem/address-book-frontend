import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";



function Login(){
    const navigate = useNavigate();
  function login(cridentials) {
    console.log(cridentials);
    axios({
      method: "post",
      url: "http://localhost:3000/api/user/login",
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify(cridentials),
    })
    .then(function(response){
        localStorage.setItem("token", response.data.auth_token);
        navigate("/contacts");
    })
    .catch(function(error){
        alert(error.response.data.message);
    });
  };

    
    return (
        <>
        {localStorage.clear()}
        <Form type = "login" login={login}/>
        </>
    )
}

export default Login;