import {Navigate} from "react-router";
import {getLoggedUser} from "../services/user-http-utils";

export function AuthenticatedAdminRoute({ children }) {
    const user = getLoggedUser();

    if (!user || user.isAdmin === false) {
        return <Navigate to='/'/>;
    }

    return children;
}
