import axios from 'axios';
import React from "react";
import {deleteRental, getCustomerRentals} from "./rental-http-utils";

const apiUrl = 'http://localhost:3005/Users';
const loggedUserKey = 'loggedUserKey';

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem(loggedUserKey));
}

export function setLoggedUser(user) {
    localStorage.setItem(loggedUserKey,JSON.stringify(user));
}

export function getAllUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export async function removeUser(id){
    const userRentals = (await getCustomerRentals(id)).data;
    for(let i = 0; i < userRentals.length; i++){
        if(userRentals[i].status !== "Completed"){
            throw new Error('Customers cannot be deleted while they are renting a car!');
        }
    }
    for(let i = 0; i < userRentals.length; i++){
        deleteRental(userRentals[i].id);
    }
    return axios.delete(`${apiUrl}/${id}`);
}

export async function save(user) {
    const emailRegEx = /^[a-zA-Z\d]+@[a-zA-Z\d]+\.[A-Za-z]+$/;
    const phoneRegEx = /^\d+$/;

    //validation here
    if(user.name === "" || user.name.split(" ").length !== 3){
        throw new Error('Please enter your full name!');
    }

    if(user.password === ""){
        throw new Error('Please enter a password!');
    }

    if(user.phone.length !== 10 || !phoneRegEx.test(user.phone)){
        throw new Error('Please enter a valid phone number!');
    }

    if(user.email === "" || !emailRegEx.test(user.email)){
        throw new Error('Please enter a valid email address!');
    }

    if (user.id) {
        const loggedUser = getLoggedUser();
        if(user.id === loggedUser.id){
            setLoggedUser(user);
        }
        const userWithSameEmail = (await getAllUsers()).data.filter(u => u.email === user.email && u.id !== user.id);
        if(userWithSameEmail && userWithSameEmail.length>0){
            throw new Error('This email belongs to another user\'s account!');
        }
        return axios.put(`${apiUrl}/${user.id}`, user);
    }

    user.isAdmin = false;
    user.isVIP = false;

    const userCount=(await getAllUsers()).data.length;

    user.id=userCount+1;
    return axios.post(`${apiUrl}`, user);
}
