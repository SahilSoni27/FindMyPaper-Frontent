import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  // Automatically redirect to LinkedIn page after successful login
  useEffect(() => {
    if (isAuthenticated) {
      const linkedinSubmitted = localStorage.getItem("linkedinSubmitted");
      if (linkedinSubmitted) {
        navigate("/"); // If LinkedIn is already submitted, go home
      } else {
        navigate("/linkedin"); // Else, go to LinkedIn submission page
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
      {!isAuthenticated ? (
        <Button color="inherit" onClick={loginWithRedirect}>
          LOG IN
        </Button>
      ) : (
        <>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={user?.picture} sx={{ width: 32, height: 32 }}>
                {user?.name?.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon/>
            </ListItemIcon>
              <Profile/>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
}
