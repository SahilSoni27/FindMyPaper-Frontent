import React from "react";
import { Box, Container, Typography } from "@mui/material";
import HomePageComponent from "./HomePageComponent";
import Footer from "../Footer";
import fmp from "./fmp.png";

// MUI Icons
import ArticleIcon from "@mui/icons-material/Article";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";

const Home = () => {
  return (
    <>
      {/* Main Container */}
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, md: 4 },
          pt: 4,
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{
            py: 4,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Text Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              mb: { xs: 3, md: 0 },
            }}
          >
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Welcome to KampusKonnect 🎓
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your one-stop platform for past papers, quality notes, and connecting with your academic peers. Empower your study journey with KampusKonnect!
            </Typography>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={fmp}
              alt="KampusKonnect Logo"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(3, 1fr)",
        }}
        gap={4}
        maxWidth="1200px"
        mx="auto"
        px={2}
        py={4}
      >
        <HomePageComponent
          icon={<ArticleIcon sx={{ fontSize: 40, color: "primary.main" }} />}
          title="University Papers"
          desc="Browse and download curated past year papers from top universities."
        />
        <HomePageComponent
          icon={<MenuBookIcon sx={{ fontSize: 40, color: "secondary.main" }} />}
          title="College Notes"
          desc="Access detailed and easy-to-understand notes prepared by toppers and professors."
        />
        <HomePageComponent
          icon={<PeopleIcon sx={{ fontSize: 40, color: "success.main" }} />}
          title="Connect & Collaborate"
          desc="Build your academic network, join study groups, and grow together."
        />
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
