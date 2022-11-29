import '../home/home.css';
import {Outlet} from "react-router";

export function Main() {
    return(
        <div className="main">
            <Outlet />
        </div>
    );
}
