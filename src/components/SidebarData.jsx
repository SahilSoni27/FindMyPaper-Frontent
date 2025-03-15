import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from "@mui/icons-material/Note";
import MailIcon from "@mui/icons-material/Mail";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
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
    title: "ContactUs",
    icon: <MailIcon />,
    link: "/contactus",
  },
];