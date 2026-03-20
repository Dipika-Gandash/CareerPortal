import axios from "axios";

const api = axios.create({
    baseURL: "https://careerportal-backend.onrender.com",
    withCredentials: true
})

export default api;