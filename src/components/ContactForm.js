import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Radio from "./Radio";
import { MapContainer, TileLayer, Marker, Popup, useMap,  useMapEvents } from 'react-leaflet';



function ContactForm({type, id, add, update}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [relationship, setRelationship] = useState("");
    const [location, setLocation] = useState([33.89351126947809, 35.49526530619446]);


    const navigate = useNavigate();

    useEffect(function(){
        getContact();
      }, []);

    async function getContact(){
        if (type === "update"){
            let token = localStorage.getItem("token");
            await axios({
                method: "get",
                url: `http://localhost:3000/api/contacts/?id=${id}`,
                headers: {
                "Content-type": "application/json",
                "Authorization" : token
                }
            })
            .then(function(response){
                // console.log(response.data.location);
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

    function AddMarkerToClick({ location }) {
        const [markers, setMarkers] = useState([{lat: location[0], lng: location[1]}]);
    
        const map = useMapEvents({
            click(e) {
            console.log("hello");
            const newMarker = e.latlng;
            // console.log(newMarker);
            setLocation([newMarker.lat, newMarker.lng]);
            setMarkers([newMarker]);
            },
        })
        
        return (
            <>
            {markers.length !== 0 && markers.map(marker => 
                <Marker position={[marker.lat, marker.lng]}>
                <Popup>Marker is at {marker.lat}</Popup>
                </Marker>
            )}
            </>
            )
        }
    
        
        function ChangeView({ center, zoom }) {
            const map = useMap();
            map.setView(center, zoom);
            return null;
          }

    function onSubmit(e){
      e.preventDefault();
      {type === "update" ? update({name, email, phone, relationship, location}) : add({name, email, phone, relationship, location});}
    };
    let center = location;
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
                {console.log(location)};
                <MapContainer center={location} zoom={13} scrollWheelZoom={true}>
                <ChangeView center={location} zoom={13} />
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <AddMarkerToClick location = {location}/>
                </MapContainer>
                <div className="btn-container">
                <button type="button" className="btn red" onClick={()=>navigate("/contacts")}>Cancel</button>
                <button type="submit" className="btn green">Save changes</button>
                </div>
            </div>
        </form>
    )
}

export default ContactForm;