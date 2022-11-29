import {getLoggedUser} from "../utils/services/user-http-utils";
import {logout} from "../utils/services/auth-http-utils";

export function Temp(){
    const user= getLoggedUser();

    return(
        <div>
            {user.email}
            <button onClick={logout}>Logout</button>
        </div>
    );
}
