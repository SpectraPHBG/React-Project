import axios from 'axios';

const apiUrl = 'http://localhost:3005/VehicleBrands';

export function getAllVehicleBrands() {
    return axios.get(apiUrl);
}

export function getVehicleBrandById(id) {
    return axios.get(`${apiUrl}/${id}`);
}
