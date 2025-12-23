import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ✅ NAMED EXPORTS (THIS IS WHAT LOGIN.JSX NEEDS)
export const loginApi = (data) => API.post("/auth/login", data);
export const registerApi = (data) => API.post("/auth/register", data);

export default API;
