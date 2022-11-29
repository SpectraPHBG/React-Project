import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getVehicleById, saveVehicle} from "../../../utils/services/vehicle-http-utils";
import {useNavigate, useParams} from "react-router";
import {getAllVehicleTypes} from "../../../utils/services/vehicle-type-http-utils";
import {getAllFuelTypes} from "../../../utils/services/fuel-type-http-utils";
import {getAllVehicleBrands} from "../../../utils/services/vehicle-brand-http-utils";
import {getAllVehicleModels} from "../../../utils/services/vehicle-model-http-utils";

export function VehicleForm(){
    const emptyVehicle = {
        id:'',
        modelId: '1',
        brandId: '1',
        constructionYear:'0',
        fuelTypeId:'1',
        vehicleTypeId: '1',
        seats:'0',
        dailyPrice:'0',
        count:'0'
    };
    const [vehicle, setVehicle] = useState(emptyVehicle);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleBrands, setVehicleBrands] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [brandModels, setBrandModels] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const params = useParams();

    useEffect(()=>{
        if(params.id){
            getVehicleById(params.id)
                .then((response)=>{
                    setVehicle(response.data);
                    getAllVehicleModels()
                        .then((modelsResponse) => {
                            setVehicleModels(modelsResponse.data);
                            setBrandModels(modelsResponse.data.filter(model => model.brandId === parseInt(response.data.brandId)));
                        });
                });
        }
        else{
            setVehicle(emptyVehicle);
        }
    },[params.id])

    useEffect(() => {
        getAllVehicleTypes()
            .then((response) => {
                setVehicleTypes(response.data);
            });
        getAllFuelTypes()
            .then((response) => {
                setFuelTypes(response.data);
            });
        getAllVehicleBrands()
            .then((response) => {
                setVehicleBrands(response.data);
            });
        getAllVehicleModels()
            .then((response) => {
                setVehicleModels(response.data);
                setBrandModels(response.data.filter(model => model.brandId === parseInt(vehicle.brandId)));
            });
    }, []);

    useEffect(() => {
        if(vehicleModels.length>0){
            setBrandModels(vehicleModels.filter(model => model.brandId === parseInt(vehicle.brandId)));
            if(brandModels.length>0){
                vehicle.modelId = brandModels[0]['id'];
            }
        }
    }, [vehicle.brandId]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveVehicle(vehicle).then(() => {
            navigate('/browse');
        })
            .catch(error => setError(error.message));
    }

    const onInputChange = (event) => {
        if(event.target.value>=0){
            setVehicle((prevState) => {
                return {
                    ...prevState,
                    [event.target.name]: event.target.value
                }
            });
        }
        setError('');
    }

    const renderVehicleTypes = () => {
        return (
            <>
                {vehicleTypes.map(vehicleType => <option key={vehicleType.id} value={vehicleType.id}>{vehicleType.type}</option>)}
            </>
        );
    }
    const renderVehicleBrands = () => {
        return (
            <>
                {vehicleBrands.map(vehicleBrand => <option key={vehicleBrand.id} value={vehicleBrand.id}>{vehicleBrand.name}</option>)}
            </>
        );
    }

    const renderVehicleModels = () => {
        return (
            <>
                {brandModels.map(brandModel => <option key={brandModel.id} value={brandModel.id}>{brandModel.name}</option>)}
            </>
        );
    }

    const renderFuelTypes = () => {
        return (
            <>
                {fuelTypes.map(fuelType => <option key={fuelType.id} value={fuelType.id}>{fuelType.type}</option>)}
            </>
        );
    }

    return (
        <div className="login-form-wrapper container-fluid py-5 min-vh-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <Form onSubmit={onFormSubmit} className="my-4 pb-4 card h-100 shadow-2-strong">
                        <h3 className="my-4">{params.id ? "Edit Vehicle" : "Add Vehicle"}</h3>
                        <div>
                            {error && <span className="text-danger">{error}</span>}
                            <Form.Group className="mb-3 w-75 m-auto" controlId="vehicleType">
                                <Form.Label>Vehicle Type</Form.Label>
                                <Form.Select name="vehicleTypeId" value={vehicle.vehicleTypeId} onChange={onInputChange} required>
                                    {renderVehicleTypes()}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="fuelType">
                                <Form.Label>Fuel</Form.Label>
                                <Form.Select name="fuelTypeId" value={vehicle.fuelTypeId} onChange={onInputChange} required>
                                    {renderFuelTypes()}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="vehicleBrand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Select name="brandId" value={vehicle.brandId} onChange={onInputChange} required>
                                    {renderVehicleBrands()}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="vehicleModel">
                                <Form.Label>Model</Form.Label>
                                <Form.Select name="modelId" value={vehicle.modelId} onChange={onInputChange} required>
                                    {renderVehicleModels()}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="constructionYear">
                                <Form.Label>Construction Year</Form.Label>
                                <Form.Control type="number" placeholder="Enter construction year" name="constructionYear" value={vehicle.constructionYear} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="seats">
                                <Form.Label>Seats</Form.Label>
                                <Form.Control type="number" placeholder="Enter number of seats" name="seats" value={vehicle.seats} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="price">
                                <Form.Label>Price Per Day</Form.Label>
                                <Form.Control type="number" placeholder="Enter price per day in USD" name="dailyPrice" value={vehicle.dailyPrice} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="count">
                                <Form.Label>Count</Form.Label>
                                <Form.Control type="number" placeholder="Enter number of vehicles" name="count" value={vehicle.count} onChange={onInputChange} required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                {params.id ? "Edit" : "Create"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
