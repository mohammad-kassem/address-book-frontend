import React from "react";

const Radio = ({ relationship, setRelationship }) => {
  const options = ["single", "married", "divorced", "widowed"];
  return (
    <><label>Relationship Status</label>
      {options.map((option) => (
        <>
          <input type="radio" value={option} name="relationship" checked = {relationship === option} onChange={(e)=>setRelationship(e.target.value)}></input><label>{option}</label>
          </>
        
      ))}
    </>
  );
};

export default Radio;