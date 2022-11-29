import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import {getLoggedUser} from "../../../utils/services/user-http-utils";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

export function UserCard({user, onDelete, onToggleAdmin}) {
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();


    const onToggleAdminClick = () => {
        onToggleAdmin(user);
    }

    const onEditClick = () => {
        navigate(`/edit/${user.id}`);
    };

    const onDeleteClick = () => {
        onDelete(user.id);
    };

    const renderTitle = () => {
        if(user.isAdmin){
            return "- Admin";
        }
        else if(user.isVIP){
            return "- VIP";
        }
    }

    const renderToggleAdminButton = () => {
        if(loggedUser.isAdmin && loggedUser.id !== user.id){
            return <Button variant="primary" className="mx-2" onClick={onToggleAdminClick}>Toggle Admin</Button>
        }
    }

    return (
        <>
            <MDBCard className="my-4">
                <MDBCardBody>
                    <MDBCardTitle>{user.name} {renderTitle()}</MDBCardTitle>
                </MDBCardBody>
                <MDBListGroup flush='true'>
                    <MDBListGroupItem>email: {user.email}</MDBListGroupItem>
                    <MDBListGroupItem>phone: {user.phone}</MDBListGroupItem>
                </MDBListGroup>
                <MDBCardBody>
                    {renderToggleAdminButton()}
                    <Button className="btn btn-success mx-2" onClick={onEditClick}>Edit</Button>
                    <Button className="btn btn-danger mx-2" onClick={onDeleteClick}>Delete</Button>
                </MDBCardBody>
            </MDBCard>

        </>
    );
}
