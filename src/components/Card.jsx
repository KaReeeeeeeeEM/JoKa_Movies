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
        maxWidth: { xs: 130, md: 290 },
        height: "auto",
        boxShadow: "none",
        objectFit: "cover",
        "&:hover": { backgroundColor: "white" },
      }}
      mb={4}
      mt={4}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{ border: border ? border : "none" }}
      >
        {
          <CardMedia
            component="img"
            height="260"
            image={
              poster_path === null
                ? Placeholder
                : `https://image.tmdb.org/t/p/w500/${poster_path}`
            }
            alt="movie thumbnail"
            sx={{
              border: "3px solid #fff",
              transition: "transform 0.3s ease-in-out",
              width: "280px",
              "&:hover": { transform: "scale(1.02)", borderColor: "orange" },
              objectFit: "cover",
            }}
          />
        }
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="subtitle1" component="div">
            {movie}
            <Typography variant="body2" color="text.secondary">
              {year ? (
                year > 2024 ? (
                  <b>Coming soon</b>
                ) : (
                  <b>{year}</b>
                )
              ) : (
                "Top Picks"
              )}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <IconButton sx={{ color: "orange" }}>
                {star}
                <span
                  style={{
                    fontSize: "15px",
                    color: "#333",
                    fontStyle: "italic",
                  }}
                >
                  {rating}
                </span>
              </IconButton>{" "}
              {media === "TV" ? (
                <IconButton
                  sx={{ color: "#916B19", marginLeft: { md: "3rem" } }}
                >
                  <Tv fontsize="small" sx={{ paddingRight: { md: "3px" } }} />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#333",
                      fontStyle: "italic",
                    }}
                  >
                    TV Shows
                  </span>
                </IconButton>
              ) : (
                ""
              )}
              {/* ) : (
                <IconButton
                  sx={{ color: "#E45B1B", marginLeft: { md: "3rem" } }}
                >
                  <Movie fontsize="small" />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#333",
                      fontStyle: "italic",
                    }}
                  >
                    Movies
                  </span>
                </IconButton>
              )} */}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
