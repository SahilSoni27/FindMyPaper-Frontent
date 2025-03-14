// src/components/Login.jsx

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "white",
          color: "#fff",
        }}
      >
        <Box component="form" sx={{ mt: 2 }}>
          <button onClick={() => loginWithRedirect()}>Log In</button>
          <button onClick={() => logout()}>Log Out</button>
        </Box>
      </Paper>
    </Box>
  );
}
