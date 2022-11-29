import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol, MDBCardFooter
} from 'mdb-react-ui-kit';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useState} from "react";
import {useEffect} from "react";
import {getFuelTypeById} from "../../../utils/services/fuel-type-http-utils";
import {getVehicleTypeById} from "../../../utils/services/vehicle-type-http-utils";
import {getVehicleBrandById} from "../../../utils/services/vehicle-brand-http-utils";
import {getVehicleModelById} from "../../../utils/services/vehicle-model-http-utils";
import {getLoggedUser} from "../../../utils/services/user-http-utils";

export function VehicleCard({vehicle, rentDays, onDelete}) {
    const [vehicleType, setVehicleType] = useState([]);
    const [vehicleBrand, setVehicleBrand] = useState([]);
    const [vehicleModel, setVehicleModel] = useState([]);
    const [fuelType, setFuelType] = useState([]);
    const navigate = useNavigate();


    const onEditClick = () => {
        navigate(`/vehicles/edit/${vehicle.id}`);
    };

    const onDeleteClick = () => {
        onDelete(vehicle);
    };

    useEffect(() => {
        getVehicleTypeById(vehicle.vehicleTypeId)
            .then((response) => {
                setVehicleType(response.data);
            });
        getFuelTypeById(vehicle.fuelTypeId)
            .then((response) => {
                setFuelType(response.data);
            });
        getVehicleBrandById(vehicle.brandId)
            .then((response) => {
                setVehicleBrand(response.data);
            });
        getVehicleModelById(vehicle.modelId)
            .then((response) => {
                setVehicleModel(response.data);
            });
    }, []);

    const onRentButtonClick = () => {
        navigate(`/rent/${vehicle.id}`);
    }
    const renderAdminButtons = () => {
        const user = getLoggedUser();
        if (user.isAdmin) {
            return <MDBCardFooter className="justify-content-around px-0">
                <div className="d-flex flex-sm-column flex-md-row">
                        <span className="button-wrapper col-12 col-md-6">
                        <Button variant='primary' className="px-5 m-2 ms-md-3 me-md-3 w-100" onClick={onEditClick}>Edit</Button>
                    </span>
                    <span className="button-wrapper col-12 col-md-6">
                        <Button variant="danger" className="px-5 m-2 ms-md-3 me-md-3 w-100" onClick={onDeleteClick}>Delete</Button>
                    </span>
                </div>
            </MDBCardFooter>
        }
    }


    return (
        <>
            <MDBCard className="mb-4" style={{maxWidth: '645px'}}>
                <MDBRow className='g-0'>
                    <MDBCol md='6'>
                        <MDBCardImage className="img-fluid mt-md-5 mt-lg-0" src={vehicleModel.photoLink} alt='...'/>
                    </MDBCol>
                    <MDBCol md='6'>
                        <MDBCardBody>
                            <MDBCardTitle>{vehicleBrand.name} {vehicleModel.name}</MDBCardTitle>
                            <MDBCardText>
                                <span className="fw-bold">Type: </span>
                                {vehicleType.type}
                                <br/>
                                <span className="fw-bold">Fuel: </span>
                                {fuelType.type}
                                <br/>
                                <span className="fw-bold">Seats: </span>
                                {vehicle.seats}
                                <br/>
                                <span className="fw-bold">Construction Year: </span>
                                {vehicle.constructionYear}
                                <br/>
                                <span className="fw-bold">Available: </span>
                                {vehicle.count}
                            </MDBCardText>
                            <MDBCardText>
                                <small className='text-muted'>Price for {rentDays} days:
                                    ${vehicle.dailyPrice * rentDays}</small>
                            </MDBCardText>
                            <Button className="btn-success w-100" onClick={onRentButtonClick}>Rent</Button>
                        </MDBCardBody>
                    </MDBCol>
                    {renderAdminButtons()}
                </MDBRow>
                <MDBRow>

                </MDBRow>
            </MDBCard>
        </>
    );
}
