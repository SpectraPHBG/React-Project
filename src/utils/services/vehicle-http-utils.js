import axios from 'axios';
import {getVehicleRentals} from "./rental-http-utils";

const apiUrl = 'http://localhost:3005/Vehicles';

export async function getAllVehicles() {
    return await axios.get(apiUrl);
}

export function getVehicleById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export async function saveVehicle(vehicle) {
    const numberRegEx = /^\d+$/;

    if(vehicle.seats.length === 0 || !numberRegEx.test(vehicle.seats)){
        throw new Error('Please enter a valid seat number!');
    }

    if(vehicle.dailyPrice.length === 0 || !numberRegEx.test(vehicle.dailyPrice)){
        throw new Error('Please enter a valid price per day!');
    }

    if(vehicle.count.length === 0 || !numberRegEx.test(vehicle.count)){
        throw new Error('Please enter a valid count!');
    }

    if(vehicle.constructionYear.length === 0 || !numberRegEx.test(vehicle.constructionYear)){
        throw new Error('Please enter a valid construction year!');
    }

    const vehicles = (await getAllVehicles()).data;
    const existingVehicle = vehicles.filter(
        v => v.brandId === vehicle.brandId
            && v.modelId === vehicle.modelId
            && v.fuelTypeId === vehicle.fuelTypeId
            && v.seats === vehicle.seats
    )

    vehicle.modelId = parseInt(vehicle.modelId);
    vehicle.brandId = parseInt(vehicle.brandId);
    vehicle.constructionYear = parseInt(vehicle.constructionYear);
    vehicle.fuelTypeId = parseInt(vehicle.fuelTypeId);
    vehicle.vehicleTypeId = parseInt(vehicle.vehicleTypeId);
    vehicle.dailyPrice = parseInt(vehicle.dailyPrice);
    vehicle.seats = parseInt(vehicle.seats);
    vehicle.count = parseInt(vehicle.count);

    if (vehicle.id) {
        const vehicleRentals =(await getVehicleRentals(vehicle.id)).data;
        if(vehicleRentals && vehicleRentals>0){
            const dbVehicle =(await getVehicleById(vehicle.id)).data;
            if(vehicle
                && (vehicle.modelId !== dbVehicle.modelId
                    || vehicle.brandId !== dbVehicle.brandId
                    || vehicle.constructionYear !== dbVehicle.constructionYear
                    || vehicle.fuelTypeId !== dbVehicle.fuelTypeId
                    || vehicle.vehicleTypeId !== dbVehicle.vehicleTypeId
                    || vehicle.seats !== dbVehicle.seats
                    || vehicle.dailyPrice !== dbVehicle.dailyPrice)){
                throw new Error('You can only change vehicle count while a vehicle is rented!');
            }
        }

        vehicle.id = parseInt(vehicle.id);
        return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
    }else {
        if(existingVehicle.length !== 0){
            throw new Error('This vehicle already exists!');
            // const patchVehicle = {
            //     id: existingVehicle[0].id,
            //     count: parseInt(vehicle.count) + parseInt(existingVehicle[0].count)
            // };
            // return axios.patch(`${apiUrl}/${existingVehicle[0].id}`, patchVehicle);
        }
    }

    const vehicleCount=vehicles.length;

    vehicle.id=vehicleCount+1;
    return axios.post(`${apiUrl}`, vehicle);
}

export async function removeVehicle(id) {
    const vehicleRentals = (await getVehicleRentals(id)).data;
    if (vehicleRentals.length > 0) {
        throw new Error('You cannot delete a vehicle while it is being rented!');
    }
    return axios.delete(`${apiUrl}/${id}`);
}
