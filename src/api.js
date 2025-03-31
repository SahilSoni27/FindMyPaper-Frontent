import axios from "axios";  // Import axios to make HTTP requests

const API_URL = "http://localhost:3000/papers";  // Backend API endpoint

export const updatePapers = async () => {
    try {
        console.log(`${API_URL}`);
        const response = await axios.post(`${API_URL}/update`);  // Send a POST request
        console.log("Update successful:", response.data);  // Log success
        return response.data;  // Return response data
    } catch (error) {
        console.error("Error updating papers:", error);  // Log errors
        throw error;
    }
};
