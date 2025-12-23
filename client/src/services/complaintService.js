import axios from 'axios';

const API_URL = "http://localhost:5000/api/complaints";

// Get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const complaintService = {
    // 1. Raise a new complaint (Handles text + files)
    createComplaint: async (formData) => {
        // We use a separate header for multipart because of the file upload
        const response = await axios.post(API_URL, formData, {
            headers: {
                ...getAuthHeaders().headers,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    // 2. Get complaints for the logged-in user
    getMyComplaints: async () => {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    },

    // 3. Get ALL complaints (Admin only)
    getAllComplaints: async () => {
        const response = await axios.get(`${API_URL}/admin/all`, getAuthHeaders());
        return response.data;
    },

    // 4. Update complaint status (Admin only)
    updateStatus: async (id, status) => {
        const response = await axios.patch(
            `${API_URL}/admin/update/${id}`,
            { status },
            getAuthHeaders()
        );
        return response.data;
    }
};

export default complaintService;