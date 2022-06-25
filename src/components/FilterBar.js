import React from "react";
import { useState } from "react";


function FilterBar({ contacts, setContacts }){
    const [filters, setFilters] = useState([["","",""], ["","",""], ["","",""], ["","",""]]);
    const classes =["name", "email", "phone", "relationship"];

    function handleChange(e, i, j){
        const temp = filters.map((filter, index)=>{
            if (i !== index){
                return filter
            }
            else {filter[j] = e.target.value; return filter}
        })
        setFilters(temp);
        function filterFunction(contact){
            if (contact.name.startsWith(filters[0][0]) && contact.name.includes(filters[0][1])&& contact.name.endsWith(filters[0][2])
            && contact.email.startsWith(filters[1][0]) && contact.email.includes(filters[1][1]) && contact.email.endsWith(filters[1][2])
            && contact.phone.startsWith(filters[2][0]) && contact.phone.includes(filters[2][1]) && contact.phone.endsWith(filters[2][2])
            && contact.relationship.startsWith(filters[3][0]) && contact.relationship.includes(filters[3][1]) && contact.relationship.endsWith(filters[3][2])) 
            return true;
        }

        setContacts(contacts.filter(filterFunction));
    }

    return(
        <>
        <div className="row-container">
        {filters.map((filter, i)=>{return(
            <div key={i} className="filter-container">
            <div className={classes[i]}>
            <label>Starts with</label>
            <input type="text" value={filter[0]} onChange={(e)=>{handleChange(e, i, 0)}}></input>
            <label>includes</label>
            <input type="text" value={filter[1]} onChange={(e)=>{handleChange(e, i, 1)}}></input>
            <label>Ends with</label>
            <input type="text" value={filter[2]} onChange={(e)=>{handleChange(e, i, 2)}}></input>
            </div>
            </div>
        )})}
        <div></div>
        <div></div>
        </div>
        </>
    )
}

export default FilterBar;