import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full height
        }}
      >
        <CircularProgress size={60} thickness={5} />
      </Box>
    );
  }
  if (!isAuthenticated) {
    loginWithRedirect(); // Redirects to Auth0 login
    return null;
  }

  return children;
};

export default ProtectedRoute;
