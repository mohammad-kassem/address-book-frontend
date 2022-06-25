import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Radio from "./Radio";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';



function ContactForm({type, id, add, update}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [relationship, setRelationship] = useState("");
    const [location, setLocation] = useState("");


    const navigate = useNavigate();

    function AddMarkerToClick() {
    const [markers, setMarkers] = useState([{lat: 33.89351126947809, lng: 35.49526530619446}]);

    const map = useMapEvents({
        click(e) {
        console.log("hello");
        const newMarker = e.latlng;
        console.log(newMarker);
        setMarkers([newMarker]);
        },
    })
    
    return (
        <>
        {markers.length !== 0 && markers.map(marker => 
            <Marker position={marker}>
            <Popup>Marker is at {marker}</Popup>
            </Marker>
        )}
        </>
        )
    }

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
        <form className="contact-form" onSubmit={onSubmit}>
            <div className="contact-header">
                <h1>Contact details</h1>
            </div>
            <div className="form-content">
                <div className="input-container">
                <label>Full name</label>
                <input type="text" id="full-name" value={name} onChange={function(e){
                setName(e.target.value);}}></input>
                </div>
                <div className="input-container">
                <label>Email address</label>
                <input type="email" id="email" value={email} required onChange={function(e){
                setEmail(e.target.value);}}></input>
                </div>
                <div className="input-container">
                <label>Phone number</label>
                <input type="text" id="phone" value={phone} required onChange={function(e){
                setPhone(e.target.value);}}></input>
                </div>
                <div className="input-container">
                <Radio relationship={relationship} setRelationship={setRelationship}/>
                </div>
                <label>Location</label> 
                <MapContainer center={[33.888630, 35.495480]} zoom={13} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <AddMarkerToClick />
                </MapContainer>
            </div>
        </form>
    )
}

export default ContactForm;