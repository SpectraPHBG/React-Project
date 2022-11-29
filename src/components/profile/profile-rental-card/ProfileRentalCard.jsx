import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import moment from "moment";
import {isRentalLate} from "../../../utils/validation/RentalValidator";
import {saveRental} from "../../../utils/services/rental-http-utils";

export function ProfileRentalCard({rentEvent}) {

    const renderLateStatus = () => {
        if(isRentalLate(rentEvent) === true) {
            rentEvent.status = "Late";
            saveRental(rentEvent);
        }

        if(rentEvent.status === "Ongoing"){
            return <span className='text-warning fw-bold'>{rentEvent.status}</span>
        }
        else if (rentEvent.status === "Late"){
            return <span className='text-danger fw-bold'>{rentEvent.status}</span>
        }
        else {
            return <span className='text-success fw-bold'>{rentEvent.status}</span>
        }
    }

    return (
        <>
            <MDBCard className='my-2' style={{maxWidth: '645px'}}>
                <MDBRow className='g-0'>
                    <MDBCol md='8' className="my-auto">
                        <MDBCardBody>
                            <MDBCardTitle>{rentEvent.rentedVehicle}</MDBCardTitle>
                            <div>
                                From: {moment(rentEvent.rentFrom).format('DD MMM yyyy, h:mm a')}
                            </div>
                            <div>
                                To: {moment(rentEvent.rentTo).format('DD MMM yyyy, h:mm a')}
                            </div>

                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol md='4' className="my-auto">
                        <div className="mt-3">
                            Price: {rentEvent.totalSum}$
                        </div>
                        {renderLateStatus()}
                    </MDBCol>
                </MDBRow>
                <MDBRow>

                </MDBRow>
            </MDBCard>

        </>
    )
}
