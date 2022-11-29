import {Button, Collapse, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getAllVehicleTypes} from "../../../utils/services/vehicle-type-http-utils";
import {getAllFuelTypes} from "../../../utils/services/fuel-type-http-utils";
import {getAllVehicleBrands} from "../../../utils/services/vehicle-brand-http-utils";
import {getAllVehicles} from "../../../utils/services/vehicle-http-utils";

export function VehicleFilter({setVehicles}) {
    const minCollapseDisplay = 3;
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleBrands, setVehicleBrands] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);

    const [openType, setOpenType] = useState(false);
    const [openFuel, setOpenFuel] = useState(false);
    const [openBrand, setOpenBrand] = useState(false);

    const [typeFilter, setTypeFilter] = useState([]);
    const [fuelFilter, setFuelFilter] = useState([]);
    const [brandFilter, setBrandFilter] = useState([]);
    const [seatsFilter, setSeatsFilter] = useState(0);
    const [minPriceFilter, setMinPriceFilter] = useState(0);
    const [maxPriceFilter, setMaxPriceFilter] = useState(0);

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
    }, []);

    const onTypeCheckBoxChange = (event) => {
        const checkedId = parseInt(event.target.id);
        if (event.target.checked && checkedId > 0) {
            setTypeFilter((prevState) => {
                return [
                    ...prevState,
                    checkedId
                ]
            });
        } else {
            if (typeFilter?.length > 0) {
                setTypeFilter((prevState) => {
                    return prevState.filter(c => c !== checkedId)
                });
            }
        }
    }

    const onFuelCheckBoxChange = (event) => {
        const checkedId = parseInt(event.target.id);
        if (event.target.checked && checkedId > 0) {
            setFuelFilter((prevState) => {
                return [
                    ...prevState,
                    checkedId
                ]
            });
        } else {
            if (fuelFilter?.length > 0) {
                setFuelFilter((prevState) => {
                    return prevState.filter(c => c !== checkedId)
                });
            }
        }
    }

    const onBrandCheckBoxChange = (event) => {
        const checkedId = parseInt(event.target.id);
        if (event.target.checked && checkedId > 0) {
            setBrandFilter((prevState) => {
                return [
                    ...prevState,
                    checkedId
                ]
            });
        } else {
            if (brandFilter?.length > 0) {
                setBrandFilter((prevState) => {
                    return prevState.filter(c => c !== checkedId)
                });
            }
        }
    }

    const onSeatsInputChange = (event) => {
        if(event.target.value.length === 0 || parseInt(event.target.value) < 0){
            setSeatsFilter(0);
        }
        else{
            setSeatsFilter(parseInt(event.target.value));
        }
    }

    const onMinPriceInputChange = (event) => {
        if(event.target.value.length === 0 || parseInt(event.target.value) < 0){
            setMinPriceFilter(0);
        }
        else{
            setMinPriceFilter(parseInt(event.target.value));
        }
    }

    const onMaxPriceInputChange = (event) => {
        if(event.target.value.length === 0 || parseInt(event.target.value) < 0){
            setMaxPriceFilter(0);
        }
        else{
            setMaxPriceFilter(parseInt(event.target.value));
        }
    }

    const onFormReset = (event) => {
        event.preventDefault();
        setTypeFilter([]);
        setFuelFilter([]);
        setBrandFilter([]);
        setSeatsFilter(0);
        setMinPriceFilter(0);
        setMaxPriceFilter(0);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        getAllVehicles().then((response) =>{
            let vehicles = response.data;
            if(typeFilter.length>0){
                vehicles = vehicles.filter(v => typeFilter.includes(v.vehicleTypeId));
            }
            if(fuelFilter.length>0){
                vehicles = vehicles.filter(v => fuelFilter.includes(v.fuelTypeId));
            }
            if(brandFilter.length>0){
                console.log(brandFilter.length)
                vehicles = vehicles.filter(v => brandFilter.includes(v.brandId));
            }
            if(seatsFilter>0){
                vehicles = vehicles.filter(v => v.seats === seatsFilter);
            }
            if(minPriceFilter>0){
                vehicles = vehicles.filter(v => v.dailyPrice >= minPriceFilter);
            }
            if(maxPriceFilter>0){
                vehicles = vehicles.filter(v => v.dailyPrice <= maxPriceFilter);
            }
            setVehicles(vehicles.filter(v => v.count>0));
        });
    }

    const renderVehicleTypes = () => {
        return (
            <>
                {vehicleTypes.map(vehicleType => {
                    if (vehicleType.id > minCollapseDisplay) {
                        return <Collapse in={openType} key={vehicleType.id} >
                            <div id="type-collapse">
                                <Form.Check id={vehicleType.id} label={vehicleType.type}
                                            name={vehicleType.type}/>
                            </div>
                        </Collapse>
                    }
                    else {
                        return <Form.Check key={vehicleType.id} id={vehicleType.id} label={vehicleType.type}
                                           name={vehicleType.type}/>
                    }

                })}
            </>
        );
    }
    const renderVehicleBrands = () => {
        return (
            <>
                {vehicleBrands.map(vehicleBrand => {
                    if (vehicleBrand.id > minCollapseDisplay) {
                        return <Collapse in={openBrand} key={vehicleBrand.id}>
                            <div id="brand-collapse">
                                <Form.Check id={vehicleBrand.id}
                                            label={vehicleBrand.name} name={vehicleBrand.name}/>
                            </div>
                        </Collapse>
                    }
                    else {
                        return <Form.Check key={vehicleBrand.id} id={vehicleBrand.id}
                                           label={vehicleBrand.name} name={vehicleBrand.name}/>
                    }

                })}
            </>
        );
    }

    const renderFuelTypes = () => {
        return (
            <>
                {fuelTypes.map(fuelType => {
                    if (fuelType.id > minCollapseDisplay) {
                        return <Collapse in={openFuel} key={fuelType.id}>
                            <div id="fuelCollapse">
                                <Form.Check id={fuelType.id} label={fuelType.type}
                                            name={fuelType.type}/>
                            </div>
                        </Collapse>
                    }
                    else {
                        return <Form.Check key={fuelType.id} id={fuelType.id} label={fuelType.type}
                                           name={fuelType.type}/>
                    }

                })}
            </>
        );
    }

    return (
        <div>
            <Form className="ms-md-4 mb-5 py-4 card h-100 shadow-2-strong" onReset={onFormReset} onSubmit={onFormSubmit}>
                <div>
                    <Form.Group className="mx-5 w-75 text-start" controlId="vehicleType" onChange={onTypeCheckBoxChange}>
                        <Form.Label>Type:</Form.Label>
                        <div className='mx-2'>
                            {renderVehicleTypes()}
                            <Button className='p-0' variant='link' onClick={() => setOpenType(!openType)}
                                    aria-controls="type-collapse"
                                    aria-expanded={openType}>see all</Button>
                        </div>
                    </Form.Group>

                    <Form.Group className="mx-5 mt-4 w-75 text-start" controlId="fuelType" onChange={onFuelCheckBoxChange}>
                        <Form.Label>Fuel:</Form.Label>
                        <div className='mx-2'>
                            {renderFuelTypes()}
                            <Button className='p-0' variant='link' onClick={() => setOpenFuel(!openFuel)}
                                    aria-controls="fuel-collapse"
                                    aria-expanded={openFuel}>see all</Button>
                        </div>
                    </Form.Group>

                    <Form.Group className="mx-5 mt-4 w-75 text-start" controlId="vehicleBrand" onChange={onBrandCheckBoxChange}>
                        <Form.Label>Brand:</Form.Label>
                        <div className='mx-2'>
                            {renderVehicleBrands()}
                            <Button className='p-0' variant='link' onClick={() => setOpenBrand(!openBrand)}
                                    aria-controls="brand-collapse"
                                    aria-expanded={openBrand}>see all</Button>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-4 w-75 m-auto" controlId="seats">
                        <Form.Label>Seats</Form.Label>
                        <Form.Control type="number" placeholder="Enter number of seats" name="seats" value={seatsFilter}
                                      onChange={onSeatsInputChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-4 w-75 m-auto" controlId="price">
                        <Form.Label>Min Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price per day in USD" name="minPrice" value={minPriceFilter}
                                      onChange={onMinPriceInputChange} required/>
                        <Form.Label className='mt-4'>Max Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price per day in USD" name="maxPrice" value={maxPriceFilter}
                                      onChange={onMaxPriceInputChange} required/>
                    </Form.Group>
                    <Button variant="success" type="submit" className='mx-2'>
                        Search
                    </Button>
                    <Button variant="danger" type="reset" className="mx-2">
                        Clear
                    </Button>
                </div>
            </Form>
        </div>
    );
}
