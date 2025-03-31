import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function LinkedIn() {
  const [linkedinURL, setLinkedinURL] = useState("");
  const navigate = useNavigate();

  // If already submitted, redirect to home
  useEffect(() => {
    const linkedinSubmitted = localStorage.getItem("linkedinSubmitted");
    if (linkedinSubmitted) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (linkedinURL.trim() === "") {
      alert("Please enter a LinkedIn URL!");
      return;
    }

    console.log("LinkedIn URL submitted:", linkedinURL);
    localStorage.setItem("linkedinSubmitted", "true"); // Save submission status
    navigate("/"); // Redirect to Home Page after submission
  };

  return (
    <Card sx={{ minWidth: 275, padding: 2 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Enter Your LinkedIn URL
        </Typography>
        <TextField
          fullWidth
          label="LinkedIn Profile URL"
          variant="outlined"
          value={linkedinURL}
          onChange={(e) => setLinkedinURL(e.target.value)}
          sx={{ my: 2 }}
        />
      </CardContent>
      <CardActions>
        <Button size="large" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
