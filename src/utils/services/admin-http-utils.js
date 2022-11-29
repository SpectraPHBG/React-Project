import axios from "axios";

const apiUrl = 'http://localhost:3005/AdminCodes';

export function getAllCodes() {
    return axios.get(apiUrl);
}

export async function validateAdminCode(code) {
    const codes = (await getAllCodes()).data;

    const foundCode = codes.find(c => c.value === code);

    if(!foundCode){
        return false;
    }
    console.log("yes maybe");
    return true;


}
