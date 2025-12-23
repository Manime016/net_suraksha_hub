// src/services/courseService.js
import axios from "axios";

const API = "http://localhost:5000/api/courses";

export const getCourses = () => {
    return axios.get(API, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};

export const createCourse = (data) => {
    return axios.post(API, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};
