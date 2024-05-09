/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ToggleColorMode from "./ToggleColorMode";
import favIcon from "../images/favicon.png";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";

const logoStyle = {
  width: "70px",
  height: "auto",
  cursor: "pointer",
};

let TopBar = ({ mode, toggleColorMode, profile, }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const UserProfile = () => {
    if (profile) {
      return  <Avatar alt="User Profile" src={profile} sx={{ width:{xs:35, md:43},height:{xs:35, md:43}, position:{xs:"fixed",md:"relative"}, right:{xs:12,md:0}, bottom:{xs:"10px",md:0} }} />
    } else {
      return <AccountCircleIcon sx={{ color: "orange",width:{xs:35, md:43},height:{xs:35, md:43}, position:{xs:"fixed",md:"relative"}, right:{xs:12,md:0}, bottom:{xs:"10px",md:0} }} fontSize="large" />
    }
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt:2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img src={favIcon} style={logoStyle} alt="logo of sitemark" />
            </Box>
            <Box
              sx={{
                display: { md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <SearchBar />
              <Box
                sx={{
                  display: { xs: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <UserProfile />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]),
  toggleColorMode: PropTypes.func,
};

export default TopBar;
