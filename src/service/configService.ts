import axios from "axios";


//const API = 'http://localhost:8080/';
const API = 'http://192.168.0.8:8080/';

/**
 * @description axios config
 */
export default axios.create({
    baseURL: API,
    headers: {
        "Content-type": "application/json",
    }
});