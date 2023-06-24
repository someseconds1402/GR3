import axios from "axios";
import { PATH_API } from "../constant/constant";

const handleLoginAPI = async(email, password) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.LOGIN_API, { email, password })).data;
    } catch (err) {
        console.log(err);
    }
}

const getPandemicDataAPI = async() => {
    try {
        return (await axios.get(PATH_API.BASE_URL + PATH_API.GET_PANDEMIC_DATA)).data;
    } catch (err) {
        console.log(err);
    }
}

const getEpidemicDataAPI = async(province_id, pandemic_id, date) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_EPIDEMIC_DATA, { province_id, pandemic_id, date })).data;
    } catch (err) {
        console.log(err);
    }
}

const getSupplyQuantityAPI = async(province_id, pandemic_id) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_SUPPLY_QUANTITY, { province_id, pandemic_id })).data;
    } catch (err) {
        console.log(err);
    }
}

const getAllEmail = async(email) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_ALL_EMAIL, { email })).data;
    } catch (err) {
        console.log(err);
    }
}

const addUser = async(email, password) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.ADD_USER, { email, password })).data;
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async(email) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.DELETE_USER, { email })).data;
    } catch (err) {
        console.log(err);
    }
}

export {
    handleLoginAPI,
    getPandemicDataAPI,
    getEpidemicDataAPI,
    getSupplyQuantityAPI,
    getAllEmail,
    addUser,
    deleteUser,
}