import React from "react";

function Button({showFilter, setShowFilter, contacts, setContacts}){
    return(
      <button className={showFilter ? `btn btn-header red` : `btn btn-header`}
      onClick={()=>{ console.log(contacts); setContacts(contacts); setShowFilter(!showFilter);}}>
        {showFilter ? "Clear" : "Filter"}
      </button>  
    )
}


export default Button;