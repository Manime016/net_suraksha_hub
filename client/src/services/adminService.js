// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:5000/api",
// });

// // Auto attach token
// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });

// export const loginApi = (data) => API.post("/auth/login", data);

// export default API;
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const fetchAdminDashboard = () => {
    return API.get("/admin/dashboard");
};
