import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";


function ContactForm({type, add, update}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [relationship, setRelationship] = useState("");
    const [location, setLocation] = useState("");

    const { id } = useParams();

    useEffect(function(){
        getContact();
      }, []);

    function getContact(){
        if (type === "update"){
            let token = localStorage.getItem("token");
            axios({
                method: "get",
                url: `http://localhost:3000/api/contacts/?id=${id}`,
                headers: {
                "Content-type": "application/json",
                "Authorization" : token
                }
            })
            .then(function(response){
                console.log(response.data.contacts);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setRelationship(response.data.relationship);
                setLocation(response.data.location);

            })
            .catch(function(error){
                alert(error.response.data.message);
            })
        }
    }

    function onSubmit(e){
      e.preventDefault();
      {type === "update" ? update({name, email, phone, relationship, location}) : add({name, email, phone, relationship, location});}
    };

    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="form-content">
                <h1>Contact details</h1>
                <input type="text" id="full-name" value={name} placeholder="Full name" onChange={function(e){
                setName(e.target.value);}}></input> 
                <input type="email" id="email" value={email} placeholder="Email address" required onChange={function(e){
                setEmail(e.target.value);}}></input>
                <input type="text" id="phone" value={phone} placeholder="Phone number" required onChange={function(e){
                setPhone(e.target.value);}}></input>
                <input type="text" id="relationship" value={relationship} placeholder="Relationship status" required onChange={function(e){
                 setRelationship(e.target.value);}}></input>
                {/* <input type="text" id="location" value={phone} placeholder="Relationship status" required onChange={function(e){
                setRelationship(e.target.value);}}></input> */}
                <button type="submit" className="btn btn-large">Save changes</button>
            </div>
        </form>
    )
}

export default ContactForm;