import axios from 'axios';

const apiUrl = 'http://localhost:3005/VehicleModels';

export function getAllVehicleModels() {
    return axios.get(apiUrl);
}

export function getVehicleModelById(id) {
    return axios.get(`${apiUrl}/${id}`);
}
