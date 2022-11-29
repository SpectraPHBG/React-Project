import {MDBContainer, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import {getAllUsers, removeUser, save} from "../../utils/services/user-http-utils";
import {UserCard} from "../user/user-card/UserCard";
import {getAllRentals, saveRental} from "../../utils/services/rental-http-utils";
import {RentalEventCard} from "./rental-event-card/RentalEventCard";
import {getVehicleById, saveVehicle} from "../../utils/services/vehicle-http-utils";
import {ErrorModal} from "../modals/error-modal/ErrorModal";

export function Admin(){
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [users, setUsers] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllUsers().then((response) => {
            setUsers(response.data);
        })
        getAllRentals().then((rentals) => {
            setRentals(rentals.data);
        });
    },[users.length]);

    const onDelete = (id) => {
        removeUser(id).then(() => {
            setUsers((prevState) => {
                return prevState.filter(user => user.id !== id);
            })
        }).catch((response) => {
            setError(response.message);
        });
    }

    const onToggleAdmin = (user) => {
        user.isAdmin = !user.isAdmin;

        setUsers((prevState) => {
            return [...prevState.filter(u => u.id !== user.id),user];
        })
        save(user);
    }

    const onMarkComplete = (rentEvent) => {
        rentEvent.status = "Completed";

        setRentals((prevState) => {
            return [...prevState.filter(r => r.id !== rentEvent.id),rentEvent];
        })
        saveRental(rentEvent).then(() => {
            getVehicleById(rentEvent.rentedVehicleId).then((response) => {
                const rentedVehicle = response.data;
                rentedVehicle.count++;
                saveVehicle(rentedVehicle);
            });
        });
    }

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return(
        <div className="my-5">
            <h1>Admin Panel</h1>
            <MDBContainer className="p-3 my-3 d-flex flex-column w-50 min-vh-100">
                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Customers
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Rentals
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane show={justifyActive === 'tab1'}>
                        {users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete} onToggleAdmin={onToggleAdmin}/>)}
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === 'tab2'}>
                        {rentals.map(userRental => <RentalEventCard key={userRental.id} rentEvent={userRental} onMarkComplete={onMarkComplete}/>)}
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
            <ErrorModal error={error}/>
        </div>
    );
}
