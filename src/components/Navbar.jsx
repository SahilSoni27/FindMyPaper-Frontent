import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#ffffff",
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#1976d2",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                color="inherit"
                onClick={() =>
                  isAuthenticated ? logout() : loginWithRedirect()
                }
              >
                {isAuthenticated ? "LOG OUT" : "LOG IN"}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            color: "#1976d2",
          }}
        >
          <Typography variant="h5">Welcome to the Dashboard!</Typography>
          <Typography variant="h6">
            User: {isAuthenticated && user.name}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
