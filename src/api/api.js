import axios from "axios";

// ASP.Net core
const api = axios.create({
    baseURL: "http://localhost:5263/api", 
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;