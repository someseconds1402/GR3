import axios from "axios";
import { PATH_API } from "../constant/constant";

const handleLoginAPI = async(email, password) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.LOGIN_API, { email, password })).data;
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

export {
    handleLoginAPI,
    getEpidemicDataAPI,
}