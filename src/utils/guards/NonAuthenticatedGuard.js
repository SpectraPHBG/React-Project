import { Navigate } from "react-router";
import {getLoggedUser} from "../services/user-http-utils";

export function NonAuthenticatedGuard({ children }) {
    const user = getLoggedUser();

    if (user) {
        return <Navigate to="/" />;
    }

    return children;
}
