import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import api from "../utils/api";
import Profile from "./Profile";
import { useRef } from "react";
export default function Login() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const { user: localUser, setUser } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isAuthenticated && user?.sub && localUser.linkedinURL && !creating) {
      console.log("first one");
      setCreating(true);

      // Check if linkedinURL is available
      if (localUser.linkedinURL) {
        api
          .post("/add-user", {
            email: user.email,
            name: user.nickname,
            auth0_id: user.sub,
            linkedin_url: localUser.linkedinURL,
          })
          .then((res) => {
            setUser({
              email: user.email,
              name: user.nickname,
              auth0_id: user.sub,
              linkedinURL: localUser.linkedinURL,
            });
            navigate("/home");
            console.log("User added successfully:", res.data);
          })
          .catch((err) => {
            console.log("Error adding user:", err);
          })
          .finally(() => {
            setCreating(false);
          });
      } else {
        console.log("LinkedIn URL not available yet");
      }
    }
  }, [isAuthenticated, user?.sub, localUser.linkedinURL, user, navigate]);

  useEffect(() => {
    if (isAuthenticated && user?.sub && !userLoaded) {
      console.log("Fetching local user data...");
      api
        .get(`/get-user/${user.sub}`)
        .then((res) => {
          if (res.data) {
            console.log("User from backend:", res.data);

            setUser(res.data);
            setUserLoaded(true);
            console.log("User data loaded:", res.data);
            if (!res.data.linkedin_url) {
              navigate("/linkedin");
              console.log("Navigating to LinkedIn: URL not available");
            }
          }
        })
        .catch((err) => {
          console.log("Error fetching user data:", err);
          navigate("/linkedin");
        });
    }
  }, [isAuthenticated, user, navigate, userLoaded, setUser]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAuthenticated && !userLoaded) {
        console.log("Navigating to LinkedIn from useEffect timeout");
        navigate("/linkedin");
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, localUser, navigate, userLoaded]);

  const profileCalled = useRef(false);

  useEffect(() => {
    console.log("Effect triggered", {
      isAuthenticated,
      linkedin_url: localUser.linkedin_url,
      auth0_id: user?.sub,
      alreadyCalled: profileCalled.current,
    });

    if (
      isAuthenticated &&
      localUser.linkedin_url &&
      user?.sub &&
      !profileCalled.current
    ) {
      profileCalled.current = true;

      const sendProfileData = async (url, auth0_id) => {
        try {
          const response = await fetch("http://localhost:3000/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, auth0_id }),
          });

          const result = await response.json();
          console.log("Profile saved:", result);
        } catch (error) {
          console.error("Error saving profile:", error);
        }
      };

      console.log("Sending LinkedIn profile to backend...");
      sendProfileData(localUser.linkedin_url, user.sub);
    }
  }, [isAuthenticated, localUser.linkedin_url, user]);

  console.log("Local User:", localUser);
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

            <MenuItem
              onClick={() => {
                console.log("hello");
                console.log(localUser.super_user);
                if (localUser.super_user) {
                  navigate("/admin-profile");
                } else {
                  navigate("/user-profile");
                }
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              
              {localUser.super_user ? "Admin Profile" : "Profile"}
            </MenuItem>

            <Divider />
            <MenuItem
              onClick={() => logout({ returnTo: window.location.origin })}
            >
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
