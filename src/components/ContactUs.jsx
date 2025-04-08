import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
          mb: 8,
          padding: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom textAlign="center">
          Contact Us
        </Typography>

        <Typography variant="body1" textAlign="center" mb={4}>
          Got a question, feedback, or just want to say hello? We’d love to hear from you!
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <EmailIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="body1">contact@findmypaper.com</Typography>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Your Name" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Your Email" fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Message"
                fullWidth
                required
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="primary">
              Send Message
            </Button>
          </Box>
        </Box>

        {/* Social Links */}
        <Box mt={5} textAlign="center">
          <Typography variant="subtitle1" gutterBottom>
            Connect with us:
          </Typography>
          <IconButton href="https://github.com/yourgithub" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton href="https://linkedin.com/in/yourlinkedin" target="_blank">
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default ContactUs;
