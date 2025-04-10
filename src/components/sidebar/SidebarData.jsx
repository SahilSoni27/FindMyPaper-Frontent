import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from "@mui/icons-material/Note";
import MailIcon from "@mui/icons-material/Mail";
import NetworkPingIcon from '@mui/icons-material/NetworkPing';

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/home",
  },
  {
    title: "PreviousPaper",
    icon: <DescriptionIcon />,
    link: "/previouspaper",
  },
  {
    title: "Notes",
    icon: <NoteIcon />,
    link: "/notes",
  },
  {
    title: "Alumini",
    icon: <NetworkPingIcon/>,
    link: "/alumni-list",
  },
  {
    title: "ContactUs",
    icon: <MailIcon />,
    link: "/contactus",
  },
];
