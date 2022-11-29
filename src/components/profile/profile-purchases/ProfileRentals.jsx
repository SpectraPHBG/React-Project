import {
    MDBCard, MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBRow,
} from "mdb-react-ui-kit";
import {ProfileRentalCard} from "../profile-rental-card/ProfileRentalCard";
import {useState, useEffect} from "react";
import {getCustomerRentals} from "../../../utils/services/rental-http-utils";

export function ProfileRentals({user}){
    const [userRentals, setUserRentals] = useState([]);

    useEffect(()=>{
        getCustomerRentals(user.id).then((rentals) => {
            setUserRentals(rentals.data);
        });
    },[]);

    return (
        <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6">
                <MDBCard>
                    <MDBCardBody className="text-black p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBCardText className="lead fw-normal mb-0">Rentals</MDBCardText>
                        </div>
                        <MDBRow>
                            <MDBCol className="mb-2">
                                {userRentals.map(rental => <ProfileRentalCard key={rental.id} rentEvent={rental} />)}
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}
