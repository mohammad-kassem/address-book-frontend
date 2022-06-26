import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import Button from "../components/Button";

import FilterBar from "../components/FilterBar";

function Contacts(){
    const [contacts, setContacts] = useState([]);
    const [original, setOriginal] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [city, setCity] = useState([]);
    const navigate = useNavigate();
    let cities = [];
    const token = localStorage.getItem("token");

    useEffect(function(){
        getContacts();
      }, []);

    function getContacts(){
        axios({
            method: "get",
            url: "http://localhost:3000/api/contacts",
            headers: {
              "Content-type": "application/json",
              "Authorization" : token
            }
          })
          .then(function(response){
            setContacts(response.data.contacts);
            setOriginal(response.data.contacts);
            response.data.contacts.map((contact)=>
            getAddress(contact.location));
          })
          .catch(function(error){
            alert(error.response.data.message);
            navigate ("/");
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


    function getAddress(location){
      axios({
          method: "get",
          url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location[0]}&lon=${location[1]}&accept-language=en`,
          headers: {
            "Content-type": "application/json",
            "Authorization" : token
          }
        })
        .then(function(response){
          console.log(response.data.country);
          cities = [...cities, response.data.address.country];
          console.log(cities);
          setCity(cities);
          return response.data.address.city;
          
        })
        .catch(function(error){
          console.log(error);
        })
  }

    return(
        <>  
            <div className="header">
            <h1>Contacts List</h1>
            <button className="btn green" onClick={()=>navigate("add")}>Add</button>
            </div>
            <div className="row-container">
               <div className="name">Full name</div>
               <div className="email">Email</div>
               <div className="phone">Phone number</div>
               <div className="relationship">Relationship</div>
               <div className="location">Location</div>
               <div className="btn-div"><Button showFilter={showFilter} setShowFilter={setShowFilter} contacts={original} setContacts={setContacts}/></div>
            </div>
            {showFilter && <FilterBar contacts={original} setContacts={setContacts}/>}
            {contacts.map((contact, index)=>{return(
                 <div key={index} className="row-container" id={contact._id}>
                <div className="name">{contact.name}</div>
                <div className="email">{contact.email}</div>
                <div className="phone">{contact.phone}</div>
                <div className="relationship">{contact.relationship}</div>
                <div className="location">{city[index]}</div>
                <div className="icons-container">
                <div className="delete" onClick={()=>{removeContact(contact._id)}}><FaTrash/></div>
                <div className="settings" onClick={() => {navigate(`${contact._id}`);}}><BsGearFill/></div>
                </div>
                </div>
            )})}
         </>

    )
    
}

export default Contacts;