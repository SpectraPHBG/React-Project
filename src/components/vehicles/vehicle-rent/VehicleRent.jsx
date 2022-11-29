import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import './vehicle-rent.scss';
import {useNavigate, useParams} from "react-router";
import {useContext} from "react";
import {EndDateContext, StartDateContext} from "../../../utils/contexts/DateContext";
import moment from "moment";
import {getVehicleById} from "../../../utils/services/vehicle-http-utils";
import {Button} from "react-bootstrap";
import {getCustomerRentals, saveRental} from "../../../utils/services/rental-http-utils";
import {getLoggedUser} from "../../../utils/services/user-http-utils";
import {getDiscount} from "../../../utils/business-logic/rent-rules";

export function VehicleRent() {
    const {startDate, setStartDate} = useContext(StartDateContext);
    const {endDate, setEndDate} = useContext(EndDateContext);
    const rentDays = moment(endDate).diff(startDate, 'days');
    const [vehicle, setVehicle] = useState({});
    const [error, setError] = useState('');
    const [loggedUser, setLoggedUser] = useState(getLoggedUser());
    const navigate = useNavigate();
    const [rentalData, setRentalData] = useState({
        holderName: "",
        customerId: loggedUser.id,
        number: "",
        expiration: "",
        cvv: "",
        rentedVehicleId: "",
        rentFrom: startDate,
        rentTo: endDate,
        discountPercentage: 0,
        totalSum: "",
        status: "Ongoing"
    });
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id)
                .then((response) => {
                    setVehicle(response.data);
                });
        }

    }, [params.id]);

    useEffect(()=>{
        if(Object.keys(vehicle).length > 0){ // if vehicle is defined and not an empty object
            getCustomerRentals(loggedUser.id).then((response) =>{
                rentalData.discountPercentage = getDiscount(rentDays, response.data);
                const rentPrice = vehicle.dailyPrice * rentDays;
                let totalPrice = 0;
                if (rentalData.discountPercentage > 0) {
                    totalPrice = (rentPrice - (rentPrice * rentalData.discountPercentage) / 100).toFixed(2);

                }
                else{
                    totalPrice = rentPrice.toFixed(2);
                }
                setRentalData((prevState) => {
                    return {
                        ...prevState,
                        rentedVehicleId: params.id,
                        totalSum: totalPrice
                    }
                })
            });
        }
    },[vehicle])

    const onNameChange = (event) => {
        event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
        setRentalData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onCvvChange = (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
        setRentalData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onExpirationChange = (event) => {
        event.target.value = event.target.value.replace(/[^\d\/]/g, '');
        setRentalData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onCardNumChange = (event) => {
        event.target.value = event.target.value.replace(/[^\d ]/g, '');
        setRentalData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveRental(rentalData).then(() => {
            navigate('/');
        })
            .catch(error => setError(error.message));
    }

    return (
        <section className="h-100" style={{backgroundColor: "#eee"}}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6">
                        <MDBCard className="bg-light text-black rounded-3">
                            <MDBCardBody>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <MDBTypography tag="h5" className="mb-0 mx-auto">
                                        Card details
                                    </MDBTypography>
                                </div>
                                <p className="mb-0 mx-auto">
                                    colon
                                </p>
                                {error && <span className="text-danger">{error}</span>}

                                <form id="checkout-form" className="mt-4" onSubmit={onFormSubmit}>
                                    <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                                              placeholder="Cardholder's Name" contrast name="holderName"
                                              onChange={onNameChange}/>

                                    <MDBInput className="mb-4 mt-5" label="Card Number" type="text" size="lg"
                                              minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast
                                              name="number" onChange={onCardNumChange}/>

                                    <MDBRow className="mb-4 mt-5">
                                        <MDBCol md="6">
                                            <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                                                      minLength="7" maxLength="7" placeholder="MM/YYYY" contrast
                                                      name="expiration" onChange={onExpirationChange}/>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                                                      maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast
                                                      name="cvv" onChange={onCvvChange}/>
                                        </MDBCol>
                                    </MDBRow>
                                </form>

                                <hr/>

                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Subtotal</p>
                                    <p className="mb-2">${(vehicle.dailyPrice * rentDays).toFixed(2)}</p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Discount ({rentalData.discountPercentage}%{rentalData.discountPercentage === 15? " - VIP": ""})</p>
                                    <p className="mb-2">${(vehicle.dailyPrice * rentDays - rentalData.totalSum).toFixed(2)}</p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Total(Incl. taxes)</p>
                                    <p className="mb-2">${rentalData.totalSum}</p>
                                </div>

                                <Button type="submit" form="checkout-form" className="btn btn-primary"
                                        size="lg">Checkout</Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
