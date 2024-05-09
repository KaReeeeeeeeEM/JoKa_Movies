/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home"; // Import Home icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from "@mui/icons-material/Settings"; // Import Settings icon
import HelpIcon from "@mui/icons-material/Help"; // Import Help icon
import LogoutIcon from "@mui/icons-material/Logout"; // Import Logout icon
import { CssBaseline, Divider, List, Link } from "@mui/material";

let MainListItems = () => {

  const [ isSelected, setIsSelected ] = useState(false);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const { user } = useParams();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search); // Parse query string
    const profilePicture = urlSearchParams.get("profile");

    if (user) {
      setUsername(user);
    } else {
      setUsername(username);
    }

    if (profilePicture) {
      setProfile(profilePicture);
    } else {
      setProfile(profile);
    }
  }, []);


  const styles = {
    marginTop:"2rem", 
    marginBottom:"3rem", 
    backgroundColor: isSelected ? "orange" : "",
    '&:hover': {backgroundColor: "white"}
  }

  let handleClick = () =>{
    setIsSelected(!isSelected);
  }


  return (
    <React.Fragment>
      <List component="nav" sx={{marginTop:"3rem", position:"fixed", left:0, top:0,height:"100vh", width:'4.7%'}}>
      <Link href={`http://localhost:3000/Dashboard?profile=${profile}`}>
        <ListItemButton sx={styles}>
          <ListItemIcon sx={{transition: 'transform 0.3s ease-in-out',color:'orange', '&:hover': {transform: 'scale(1.02)',color:'orange'}}}>
            <HomeIcon />
          </ListItemIcon>
        </ListItemButton>
        </Link>
        <ListItemButton sx={styles}>
          <ListItemIcon sx={{transition: 'transform 0.3s ease-in-out', '&:hover': {transform: 'scale(1.02)',color:'orange'}}}>
            <PlayArrowIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton sx={styles}>
          <ListItemIcon sx={{transition: 'transform 0.3s ease-in-out', '&:hover': {transform: 'scale(1.02)',color:'orange'}}}>
            <SettingsIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton sx={styles}>
          <ListItemIcon sx={{transition: 'transform 0.3s ease-in-out', '&:hover': {transform: 'scale(1.02)',color:'orange'}}}>
            <HelpIcon />
          </ListItemIcon>
        </ListItemButton>
        <CssBaseline />
        <Link href="http://localhost:5000/logout">
        <ListItemButton sx={styles}>
          <ListItemIcon sx={{transition: 'transform 0.3s ease-in-out', '&:hover': {transform: 'scale(1.02)',color:'orange'}}}>
            <LogoutIcon />
          </ListItemIcon>
        </ListItemButton>
        </Link>
      </List>
    </React.Fragment>
  );
};

export default MainListItems;
