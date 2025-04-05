import { useAuth0 } from "@auth0/auth0-react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../login";
import { SidebarData } from "./SidebarData";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { isAuthenticated } = useAuth0();
  // useEffect(() => {
  //   if (user && user.email && user.nickname && user.sub) {
  //     const linkedinURL = localStorage.getItem("linkedinURL") || "";
  //     if (!linkedinURL) {
  //       navigate("/linkedin");
  //       return;
  //     }
  //     api
  //       .post("/add-user", {
  //         email: user.email,
  //         name: user.nickname,
  //         auth0_id: user.sub,
  //         linkedin_url: linkedinURL,
  //       })
  //       .then((res) => {
  //         console.log("User added successfully:", res.data);
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         console.log("Error adding user:", err);
  //       });
  //   }
  // }, [user]);

  //   useEffect(() => {
  //     if (isAuthenticated && user) {
  //       api
  //         .get(`/get-user/${user.sub}`)
  //         .then((res) => {
  //           if (res.data.linkedin_url) {
  //             localStorage.setItem("linkedinSubmitted", "true");
  //           navigate("/");
  //           console.log("Submitted");
  //         } else {
  //           localStorage.removeItem("linkedinSubmitted");
  //           navigate("/linkedin");
  //           console.log("Not submitted");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error fetching user data:", err);
  //         navigate("/linkedin");
  //       });
  //   }
  // }, [isAuthenticated, user, navigate]);

  // useEffect(() => {
  //   if (user && user.email && user.nickname && user.sub) {
  //     const linkedinURL = localStorage.getItem("linkedinURL") || "";
  //     api
  //       .post("/add-user", {
  //         email: user.email,
  //         name: user.nickname,
  //         auth0_id: user.sub,
  //         linkedin_url: linkedinURL,
  //       })
  //       .then((res) => {
  //         console.log("User added successfully:", res.data);
  //         if (linkedinURL) {
  //           localStorage.setItem("linkedinSubmitted", "true");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error adding user:", err);
  //       });
  //   }
  // }, [user]);

  // React.useEffect(() => {
  //   const sendUsernameToBackend = async () => {
  //     if (user && user.name) {
  //       console.log("Username:", user.sub);
  //       console.log(user.name);
  //       console.log("ffe" + JSON.stringify(user));

  //       try {
  //         const response = await fetch("http://localhost:5000/get-profile", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           // body: JSON.stringify({ username: "Dhruv Thakkar" }),
  //           body: JSON.stringify({ username: user.name }),
  //         });

  //         const result = await response.json();
  //         console.log("Profile from backend:", result);
  //       } catch (error) {
  //         console.error("Error sending username:", error);
  //       }
  //     }
  //   };

  //   sendUsernameToBackend();
  // }, [user]);

  // useEffect(() => {
  //   if (user && user.email && user.nickname && user.sub) {
  //     api
  //       .post("/add-user", {
  //         email: user.email,
  //         name: user.nickname,
  //         auth0_id: user.sub,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [user]); // Depend on user to re-run when it updates

  // React.useEffect(() => {
  //   const sendUserIdToBackend = async () => {
  //     if (user && user.sub) {
  //       console.log("LinkedIn User ID:", user.sub);
  //       try {
  //         const response = await fetch("http://localhost:5000/get-profile", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ linkedin_id: user.sub }),
  //         });

  //         const result = await response.json();
  //         console.log("Profile from backend:", result);
  //       } catch (error) {
  //         console.error("Error sending LinkedIn ID:", error);
  //       }
  //     }
  //   };

  //   sendUserIdToBackend();
  // }, [user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            FindMyPaper
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Login />
        </Toolbar>
      </AppBar>
      {/* <Typography variant="h5">Welcome to the Dashboard!</Typography>
      <Typography variant="h6">User: {isAuthenticated && user.name}</Typography> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {SidebarData.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                window.location.pathname = item.link;
              }}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
