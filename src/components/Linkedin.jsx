import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { UserContext } from "../App";

export default function LinkedIn() {
  const [linkedinURL, setLinkedinURL] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const handleSubmit = () => {
    const linkedInPattern =
      /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_]+\/?$/;

    if (linkedinURL.trim() === "") {
      alert("Please enter a LinkedIn URL!");
      return;
    }

    if (!linkedInPattern.test(linkedinURL.trim())) {
      alert("Please enter a valid LinkedIn profile URL!");
      return;
    }

    setUser({ ...user, linkedinURL });
    navigate("/login");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5", // optional for better look
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 2,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
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
          <Button fullWidth size="large" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
