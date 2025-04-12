import api from "./utils/api";

export const updatePapers = async () => {
    try {
        const response = await api.post(`/papers/update`);  // Send a POST request
        console.log("Update successful:", response.data);  // Log success
        return response.data;  // Return response data
    } catch (error) {
        console.error("Error updating papers:", error);  // Log errors
        throw error;
    }
};

export const updateNotes = async () => {
    try {
        const response = await api.post(`/notes/updatenotes`);  // Send a POST request
        console.log("Update successful:", response.data);  // Log success
        return response.data;  // Return response data
    } catch (error) {
        console.error("Error updating notes:", error);  // Log errors
        throw error;
    }
};