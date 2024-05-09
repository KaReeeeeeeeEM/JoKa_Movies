/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CircularProgress, IconButton } from "@mui/material";
import Star from "@mui/icons-material/Star";
import Tv from "@mui/icons-material/Tv";
import Movie from "@mui/icons-material/Movie";
import styled from "@emotion/styled";
import Placeholder from "../images/download.png";
import {
  LockClock,
  NewReleases,
  Timelapse,
  Verified,
} from "@mui/icons-material";

export default function ActionAreaCard({
  movie,
  media,
  airdate,
  year,
  poster_path,
  rating,
  star,
  border,
}) {
  //   const [open, setOpen] = useState(false);
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  const handleClick = () => {
    return <CircularProgress color="orange" />;
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: 220, md: 290 },
        height: "auto",
        boxShadow: "none",
        objectFit: "cover",
        "&:hover": { backgroundColor: "white" },
        //marginLeft:{xs:"-2rem"}
      }}
      mb={4}
      mt={4}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{ border: border ? border : "none" }}
      >
        <CardMedia
          component="img"
          height="260"
          image={
            poster_path === null ? Placeholder : `https://image.tmdb.org/t/p/w500/${poster_path}`
          }
          alt="movie thumbnail"
          sx={{
            transition: "transform 0.3s ease-in-out",
            width: { xs: "214px", md: "280px" },
            "&:hover": { transform: "scale(1.02)", borderColor: "orange" },
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor:"transparent",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#333",
              fontWeight: "bold",
              marginRight:"2rem"
            }}
          >
            <IconButton>
              <Verified sx={{ color: "orange" }} />
            </IconButton>
            {year ? year : "Unspecified"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
