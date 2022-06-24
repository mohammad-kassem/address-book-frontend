import React from "react";
import Form from "../components/Form";

function Login({login}){
    
    return (
        <>
        {localStorage.clear()}
        <Form type = "login" login={login}/>
        </>
    )
}

export default Login;