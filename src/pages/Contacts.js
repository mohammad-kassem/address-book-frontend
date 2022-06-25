import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';
import { BsGearFill } from "react-icons/bs";


function Contacts(){
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(function(){
        getContacts();
      }, []);

    function getContacts(){
        let token = localStorage.getItem("token");
        axios({
            method: "get",
            url: "http://localhost:3000/api/contacts",
            headers: {
              "Content-type": "application/json",
              "Authorization" : token
            }
          })
          .then(function(response){
            console.log(response.data.contacts);
            setContacts(response.data.contacts);
          })
          .catch(function(error){
            alert(error.response.data.message);
          })
    }

    function removeContact(id){
        let token = localStorage.getItem("token");
        axios({
            method: "delete",
            url: `http://localhost:3000/api/contacts/remove/?id=${id}`,
            headers: {
              "Content-type": "application/json",
              "Authorization" : token
            }
          })
          .then(function(response){
            setContacts(contacts.filter((contact) => contact._id !== id));
          })
          .catch(function(error){
            alert(error.response.data.message);
          })
    }

    return(
        <>
            <div className="row-container">
               <div className="name">Full name</div>
               <div className="email">Email</div>
               <div className="phone">Phone number</div>
               <div className="relationship">Relationship</div>
               <div className="location">Location</div>
               <div className="delete"></div>
               <div className="settings"></div>
            </div>
            {contacts.map((contact, index)=>{return(
                 <div className="row-container" id={contact._id}>
                <div className="name">{contact.name}</div>
                <div className="email">{contact.email}</div>
                <div className="phone">{contact.phone}</div>
                <div className="relationship">{contact.relationship}</div>
                <div className="location">{contact.location}</div>
                <div className="delete" onClick={()=>{removeContact(contact._id)}}><FaTrash/></div>
                <div className="settings" onClick={() => {navigate(`${contact._id}`);}}><BsGearFill/></div>
                </div>
            )})}
         </>

    )
    
}

export default Contacts;