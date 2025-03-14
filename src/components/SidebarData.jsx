<<<<<<< HEAD
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from '@mui/icons-material/Note';
import MailIcon from '@mui/icons-material/Mail';

const SidebarData = () => {
  return (
    {
        title:"Home",
        icone:<HomeIcon/>,
        link:"/home"
    },
    {
        title:"PreviousPaper",
        icone:<DescriptionIcon/>,
        link:"/previouspaper"
    },
    {
        title:"Notes",
        icone:<NoteIcon/>,
        link:"/notes"
    },
    {
        title:"ContactUs",
        icone:<MailIcon/>,
        link:"/contactus"
    }
  )
}

export default SidebarData
=======
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from "@mui/icons-material/Note";
import MailIcon from "@mui/icons-material/Mail";

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
    title: "ContactUs",
    icon: <MailIcon />,
    link: "/contactus",
  },
];
>>>>>>> 9000a39a0dd0413d6e9d7140ea5013aa8b87399e
