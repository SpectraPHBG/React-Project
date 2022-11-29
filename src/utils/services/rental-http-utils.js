import {
    validateCardCvv,
    validateCardExpirationDate,
    validateCardHolderName,
    validateCardNumber
} from "../validation/PaymentValidator";
import axios from "axios";
import {getVehicleById,saveVehicle} from "./vehicle-http-utils";
import {getVehicleBrandById} from "./vehicle-brand-http-utils";
import {getVehicleModelById} from "./vehicle-model-http-utils";
import {getLoggedUser, save} from "./user-http-utils";

const apiUrl = 'http://localhost:3005/RentalEvents';

export function getAllRentals() {
    return axios.get(apiUrl);
}

export function getCustomerRentals(customerId) {
    return axios.get(apiUrl,{
        params: {
            customerId: customerId
        }
    });
}

export function getVehicleRentals(rentedVehicleId) {
    return axios.get(apiUrl,{
        params: {
            rentedVehicleId: rentedVehicleId
        }
    });
}

export function deleteRental(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export async function saveRental(rental){
    if(!validateCardHolderName(rental.holderName)){
        throw new Error('Please enter your first and last name!');
    }
    if(!validateCardNumber(rental.number)){
        throw new Error('Please enter a valid credit/debit card!');
    }
    if(!validateCardExpirationDate(rental.expiration)){
        throw new Error('Invalid expiration date or card has expired!');
    }
    if(!validateCardCvv(rental.cvv)){
        throw new Error('Please enter a valid card Cvv!');
    }

    const rentalEventCount=(await getAllRentals()).data.length;

    const user = getLoggedUser();
    console.log("It is renting");
    if(rental.discountPercentage === 15){
        console.log("It is vip");
        user.isVIP = true;
        save(user);
    }
    else if(user.isVIP === true){
        console.log("It is not vip");
        user.isVIP = false;
        save(user);
    }

    if(rental.id){
        return axios.put(`${apiUrl}/${rental.id}`, rental);
    }

    rental.id=rentalEventCount+1;
    rental.createdAt = new Date();
    rental.updatedAt = new Date();

    const rentedVehicle = (await  getVehicleById(rental.rentedVehicleId)).data;
    const vehicleBrand = (await getVehicleBrandById(rentedVehicle.brandId)).data;
    const vehicleModel = (await getVehicleModelById(rentedVehicle.modelId)).data;

    rental.rentedVehicle = vehicleBrand.name + " " + vehicleModel.name;

    rentedVehicle.count = parseInt(rentedVehicle.count)-1;
    saveVehicle(rentedVehicle).then(()=>{
        return axios.post(`${apiUrl}`, rental);
    });
}
