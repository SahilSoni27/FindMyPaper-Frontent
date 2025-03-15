import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        py: 3,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        textAlign: "center"
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} FindMyPaper. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Privacy Policy</Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Terms of Service</Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Contact Us</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
