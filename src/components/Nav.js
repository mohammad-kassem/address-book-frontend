import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
function Nav(){
    return(
        <>
        <nav>
            <h1>Welcome User</h1>
            <div><Link to="/"><CgProfile size={40}/></Link></div>
        </nav>
        </>
    )
}

export default Nav;