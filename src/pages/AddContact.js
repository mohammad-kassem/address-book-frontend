import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContactForm from "../components/ContactForm";



function AddContact(){
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
  function add(cridentials) {
    axios({
      method: "post",
      url: "http://localhost:3000/api/contacts/add",
      headers: {
        "Content-type": "application/json",
        "Authorization" : token
      },
      data: JSON.stringify(cridentials),
    })
    .then(function(response){
        navigate("/contacts");
    })
    .catch(function(error){
        alert(error.response.data.message);
    });
  };

    
    return (
        <>
        <ContactForm type = "add" add={add}/>
        </>
    )
}

export default AddContact;