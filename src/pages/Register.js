import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";


function Register(){
    const navigate = useNavigate();
    function register(cridentials) {
        console.log(cridentials);
        axios({
            method: "post",
            url: "http://localhost:3000/api/user/register",
            headers: {
              "Content-type": "application/json",
            },
            data: JSON.stringify(cridentials),
        })
        .then(function(response){
            alert(response.data.message);
            navigate("/");
        })
        .catch(function(error){
            alert(error.response.data.message);
        });
    }



    return (
        <>
        <Form type = "register" register={register}/>
        </>
    )
}

export default Register;