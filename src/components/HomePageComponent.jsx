import React from "react";
import { Card, CardContent, Icon, Typography } from "@mui/material";

const HomePageComponent = ({title , desc}) => {
  return (
    <>
      <Card
      sx={{
        p: 2, // Padding inside the card
        textAlign: "center",
        borderRadius: "16px", // Smooth rounded corners
        boxShadow: 3, // Default shadow
        transition: "all 0.3s ease-in-out", // Smooth hover effect
        "&:hover": {
          boxShadow: 6, // Increase shadow on hover
          transform: "translateY(-5px)", // Slight lift effect
        },
      }}
    >
      <CardContent>
        
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
};

export default HomePageComponent;
