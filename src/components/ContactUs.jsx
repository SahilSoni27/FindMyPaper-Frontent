import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Footer from "./Footer";

const ContactUs = () => {
  // Replace with your WhatsApp number (include country code, no '+' sign)
  const phoneNumber = "919428235545";
  const message = encodeURIComponent("Hi! I'm interested in KampusKonnect and would like to get in touch.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
        <EmailIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
        <Typography variant="h5" gutterBottom>
          Email us at
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          support@kampuskonnect.in
        </Typography>

        <Button
          variant="contained"
          color="success"
          size="large"
          startIcon={<WhatsAppIcon />}
          href={whatsappLink}
          target="_blank"
        >
          Get in Touch
        </Button>
      </Container>

      <Footer />
    </>
  );
};

export default ContactUs;
