import axios from "axios";
import {getAllUsers, save, setLoggedUser} from "./user-http-utils";

const apiUrl = 'http://localhost:3005/Users';
const loggedUserKey = 'loggedUserKey';

export async function register(user) {
    const existingUsers = (await axios.get(`${apiUrl}?email=${user.email}`)).data;

    if (existingUsers.length > 0) {
        throw new Error('This email belongs to another user\'s account!');
    }

    return save(user);
}

export async function login(user){
    const users=(await getAllUsers()).data;

    const foundUser = users.find(u => u.email === user.email && u.password === user.password);

    if(!foundUser){
        throw new Error('Invalid username/password');
    }

    setLoggedUser(foundUser);

    return foundUser;
}

export async function logout() {
    localStorage.removeItem(loggedUserKey);
}
