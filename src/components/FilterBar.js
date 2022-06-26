import React from "react";
import { useState } from "react";


function FilterBar({ contacts, setContacts, city, setCity }){
    const [filters, setFilters] = useState({name:['', '', ''],email:['', '', ''], phone:['', '', ''], relationship:['', '', ''], country:['', '', '']});
    const classes =["name", "email", "phone", "relationship", "country"];

    function handleChange(e, i, j){
        {
        const temp = Object.values(filters).map((filter, index)=>{
            if (i !== index){
                return filter
            }
            else {filter[j] = e.target.value; return filter}
        })        
        let temp2={};
        for (let i = 0; i < temp.length; ++i)
            temp2[classes[i]] = temp[i];
        console.log(temp2);
        setFilters(temp2);
        }
        
        let k = 0;
        setContacts(contacts.filter((contact)=>{
            for (var key in filters) {
                if (!contact[key].startsWith(filters[key][0]) || !contact[key].includes(filters[key][1]) || !contact[key].endsWith(filters[key][2]))
                  return false;
              }
              return true;
            }));
    }


    return(
        <>
        <div className="row-container bg">
        {Object.values(filters).map((filter, i)=>{return(
            <div key={i} className={`filter-container ${classes[i]}`}>
            <label>Starts with</label>
            <input type="text" value={filter[0]} onChange={(e)=>{handleChange(e, i, 0)}}></input>
            <label>includes</label>
            <input type="text" value={filter[1]} onChange={(e)=>{handleChange(e, i, 1)}}></input>
            <label>Ends with</label>
            <input type="text" value={filter[2]} onChange={(e)=>{handleChange(e, i, 2)}}></input>
            </div>
        )})}
        <div className="btn-div"></div>
        </div>
        </>
    )
}

export default FilterBar;