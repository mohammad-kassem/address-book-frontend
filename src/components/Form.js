import { useState } from "react";
import { Link } from "react-router-dom";

function Form({type, login, register}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onSubmit(e){
      e.preventDefault();
      {type === "register" ? register({name, email, password}) : login({email, password});}
    };

    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="form-content">
                <h1>{type === "register" ? "Register" : "Log In"} </h1>
                {type === "register" && <input type="text" id="full-name" value={name} placeholder="Full name" onChange={function(e){
                setName(e.target.value);}}></input> }
                <input type="email" id="email" value={email} placeholder="Email address" required onChange={function(e){
                setEmail(e.target.value);}}></input>
                <input type="password" id="password" value={password} placeholder="Password" required onChange={function(e){
                setPassword(e.target.value);}}></input>
                <button type="submit" className="btn btn-large">{type === "register" ? "Register" : "Log In"}</button>
                <div className="link">
                    {type === "register" ? <Link to = "/"> Already Have An Account </Link> : <Link to = "/register"> Create New Account </Link>}
                </div>
            </div>
        </form>
    )
}

export default Form;