import React from "react";
import Form from "../components/Form";


function Register({register}){
    return (
        <>
        <Form type = "register" register={register}/>
        </>
    )
}

export default Register;