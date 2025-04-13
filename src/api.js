import axios from "axios";  // Import axios to make HTTP requests

const API_URL = process.env.API_URL;  // Backend API endpoint

export const updatePapers = async () => {
    try {
        console.log(`${API_URL}`);
        const response = await axios.post(`${API_URL}/papers/update`);  // Send a POST request
        console.log("Update successful:", response.data);  // Log success
        return response.data;  // Return response data
    } catch (error) {
        console.error("Error updating papers:", error);  // Log errors
        throw error;
    }
};

export const updateNotes = async () => {
    try {
        console.log(`${API_URL}`);
        const response = await axios.post(`${API_URL}/notes/updatenotes`);  // Send a POST request
        console.log("Update successful:", response.data);  // Log success
        return response.data;  // Return response data
    } catch (error) {
        console.error("Error updating notes:", error);  // Log errors
        throw error;
    }
};