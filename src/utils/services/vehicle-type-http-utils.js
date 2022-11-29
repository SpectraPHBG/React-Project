import axios from 'axios';

const apiUrl = 'http://localhost:3005/VehicleTypes';

export function getAllVehicleTypes() {
    return axios.get(apiUrl);
}

export function getVehicleTypeById(id) {
    return axios.get(`${apiUrl}/${id}`);
}
