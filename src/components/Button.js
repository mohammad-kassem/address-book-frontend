import React from "react";

function Button({showFilter, setShowFilter, contacts, setContacts}){
    return(
      <button className={showFilter ? `btn red` : `btn`}
      onClick={()=>{ console.log(contacts); setContacts(contacts); setShowFilter(!showFilter);}}>
        {showFilter ? "Clear" : "Filter"}
      </button>  
    )
}


export default Button;