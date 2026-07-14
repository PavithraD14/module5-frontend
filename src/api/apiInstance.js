import  axios from "axios";


const api = axios.create({
    baseURL: "https://module-5-backend-lso7.onrender.com"
});

export default api;