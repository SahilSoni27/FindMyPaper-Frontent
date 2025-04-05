import React, { useState } from "react";
import { updateNotes } from "../api";

const UpdateNotesButton = () => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            console.log("asdjgas");
            const response = await updateNotes();
            alert(response.message || "Database Updated Successfully!");
        } catch (error) {
            console.error("Error updating:", error);
            alert(error.response?.data?.error || "Failed to update database. Check console.");
        }
        setLoading(false);
    };

    return (
        <button 
            onClick={handleClick} 
            disabled={loading}
            style={{
                padding: "10px 15px",
                backgroundColor: loading ? "#ccc" : "#007BFF",
                cursor: loading ? "not-allowed" : "pointer",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
            }}
        >
            {loading ? "Updating..." : "Update Notes"}
        </button>
    );
};

export default UpdateNotesButton;

