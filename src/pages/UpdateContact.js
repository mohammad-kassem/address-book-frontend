import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContactForm from "../components/ContactForm";

function UpdateContact(){
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    useEffect(function(){
        if(!token) navigate("/");
      }, []);
       
  function update(cridentials) {
    axios({
      method: "put",
      url: `http://localhost:3000/api/contacts/update/?id=${id}`,
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
        <ContactForm type = "update" id={id} update={update}/>
        </>
    )
}

export default UpdateContact;