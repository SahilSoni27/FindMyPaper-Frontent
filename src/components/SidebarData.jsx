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