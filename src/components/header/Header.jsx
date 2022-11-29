import './header.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {AuthButton} from "./AuthButton";
import {Link} from "react-router-dom";
import {getLoggedUser} from "../../utils/services/user-http-utils";

export function Header() {
    const renderAdminNavButtons = () => {
        const loggedUser = getLoggedUser();
        if(loggedUser && loggedUser.isAdmin === true){
            return <>
                <Link className="nav-link" to="/vehicles/add">Add Vehicle</Link>
                <Link className="nav-link" to="/admin">Admin Panel</Link>
            </>;
        }
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Link className="navbar-brand" to="/">RentMyRide</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {renderAdminNavButtons()}
                        </Nav>

                        <Nav>
                            <AuthButton></AuthButton>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
