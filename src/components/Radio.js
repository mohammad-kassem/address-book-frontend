import React from "react";

const Radio = ({ setRelationship }) => {
  const options = ["single", "married", "divorced", "widowed", "complicated"];
  return (
    <><label>Relationship Status</label>
      {options.map((option) => (
        <>
          <input type="radio" value={option} name="relationship" onChange={(e)=>setRelationship(e.target.value)}></input><label>{option}</label>
        </>
      ))}
    </>
  );
};

export default Radio;