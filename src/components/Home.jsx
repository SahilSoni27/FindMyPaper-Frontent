import { Box, Container, Typography } from "@mui/material";
import React from "react";
import HomePageComponent from "./HomePageComponent";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <>
    <Sidebar/>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{ py: 4 }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Find Your Study Materials with Ease
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Access curated notes, previous year papers, and study guides
              tailored to your academic needs. Join our platform to elevate your
              learning experience!
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/path-to-your-logo.png"
              alt="FindMyPaper Logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // Mobile: 1 column
            sm: "1fr 1fr", // Tablet: 2 columns
            md: "repeat(3, 1fr)", // Desktop: 3 columns
          },
          gap: 3, // Space between cards
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto", // Center the grid
          padding: "16px",
        }}
      >
        <HomePageComponent
          title="Extensive University Papers"
          desc="Access a wide collection of past papers from various universities."
        />
        <HomePageComponent
          title="Growing Resource Hub"
          desc="Currently offering university papers, with plans to add college notes soon."
        />
        <HomePageComponent
          title="Future Personalization"
          desc="Tailored academic recommendations coming soon!"
        />
      </Box>
      <Footer/>
    </>
  );
};

export default Home;
