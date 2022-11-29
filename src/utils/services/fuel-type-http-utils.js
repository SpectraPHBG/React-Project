import axios from 'axios';

const apiUrl = 'http://localhost:3005/FuelTypes';

export function getAllFuelTypes() {
    return axios.get(apiUrl);
}

export function getFuelTypeById(id) {
    return axios.get(`${apiUrl}/${id}`);
}
