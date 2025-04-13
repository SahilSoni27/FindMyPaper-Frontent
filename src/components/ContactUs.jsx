// import React from "react";
// import { Box, Button, Typography, Container } from "@mui/material";
// import EmailIcon from "@mui/icons-material/Email";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import Footer from "./Footer";

// const ContactUs = () => {
//   // Replace with your WhatsApp number (include country code, no '+' sign)
//   const phoneNumber = "919428235545";
//   const message = encodeURIComponent("Hi! I'm interested in KampusKonnect and would like to get in touch.");
//   const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

//   return (
//     <>
//       <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
//         <EmailIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
//         <Typography variant="h5" gutterBottom>
//           Email us at
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//           support@kampuskonnect.in
//         </Typography>

//         <Button
//           variant="contained"
//           color="success"
//           size="large"
//           startIcon={<WhatsAppIcon />}
//           href={whatsappLink}
//           target="_blank"
//         >
//           Get in Touch
//         </Button>
//       </Container>

//       <Footer />
//     </>
//   );
// };

// export default ContactUs;

// src/components/ContactUs.js
import React, { useRef, useState } from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";

import emailjs from "@emailjs/browser";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ContactUs() {
  const form = useRef();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gp5whdj", // Replace with your EmailJS service ID
        "template_ggj7w06", // Replace with your EmailJS template ID
        form.current,
        "qWrF2JIDVu7PwkZdd" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setSnackbarOpen(true);
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again.", error.text);
        }
      );
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contact Us
        <EmailIcon fontSize="large" />
      </Typography>
      <form ref={form} onSubmit={sendEmail}>
        <TextField
          fullWidth
          margin="normal"
          label="Your Name"
          name="user_name"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Your Email"
          name="user_email"
          type="email"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          name="message"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Send
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
