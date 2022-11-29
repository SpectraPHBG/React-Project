import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import moment from "moment";
import './RentalEventCard.scss';
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getUserById} from "../../../utils/services/user-http-utils";

export function RentalEventCard({rentEvent, onMarkComplete}) {

    const [renter, setRenter] = useState({});

    useEffect(() => {
        getUserById(rentEvent.customerId).then((response) => {
            setRenter(response.data);
        })
    }, [])

    const onMarkCompleteClick = () => {
        onMarkComplete(rentEvent);
    }

    const renderMarkComplete = () => {
        if(rentEvent.status !== "Completed"){
            return <Button variant="success" className='mt-3' onClick={onMarkCompleteClick}>Complete</Button>
        }
    }

    return (
        <>
            <MDBCard className={rentEvent.status}>
                <MDBRow className='g-0'>
                    <MDBCol md='8' className="my-auto">
                        <MDBCardBody>
                            <MDBCardTitle>{rentEvent.rentedVehicle}</MDBCardTitle>
                            <div>
                                Rented by: {renter.name}
                            </div>
                            <div>
                                From: {moment(rentEvent.rentFrom).format('MMMM Do YYYY, h:mm:ss a')}
                            </div>
                            <div>
                                To: {moment(rentEvent.rentTo).format('MMMM Do YYYY, h:mm:ss a')}
                            </div>

                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol md='4' className="my-auto">
                        <div className="mt-3">
                            Price: {rentEvent.totalSum}$
                        </div>
                        <div>
                            Status: {rentEvent.status}
                        </div>
                        {renderMarkComplete()}
                    </MDBCol>
                </MDBRow>
                <MDBRow>

                </MDBRow>
            </MDBCard>

        </>
    )
}
