/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Card from "./Card";
import Card2 from "./Card2";
import SimpleBackDrop from "./SimpleBackDrop";
import Star from "@mui/icons-material/Star";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TopBar from "./TopBar";
import MainListItems from "./ListItems";
import {
  Description,
  Download,
  Movie,
  MovieCreation,
  RemoveRedEye,
  RemoveRedEyeTwoTone,
  Stream,
  ThumbDown,
  ThumbUp,
  TrendingUp,
  Tv,
  TvOff,
  Watch,
  WatchLater,
} from "@mui/icons-material";
import { Icon, IconButton } from "@mui/material";
import SarufiChatbox from "react-sarufi-chatbox";
import "../index.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        jokamoviespoint@gmail.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SelectedMovie() {
  const [open, setOpen] = useState(true);
  const [isDownloadClicked, setIsDownloadClicked] = useState(false);
  const [isWatchNowClicked, setIsWatchNowClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieKey, setMovieKey] = useState(null);
  const { user, movie_id } = useParams();
  const movieid = decodeURIComponent(movie_id);
  const urlSearchParams = new URLSearchParams(window.location.search); // Parse query string
  const profilePicture = urlSearchParams.get("profile");
  const searchInput = urlSearchParams.get("search");
  const youTubeId = urlSearchParams.get("videoId");
  const apiKey = "AIzaSyDMwfAgSCEzmua-XtnynxDZTZo48QhJfh4";

  useEffect(() => {
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

    if (movieid) {
      setMovieKey(movieid);
    } else {
      setMovieKey(movieKey);
    }
  }, []);



  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const related = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=035c0f1a7347b310a5b95929826fc81f&language=en-US`
        );
        setRelatedMovies(related.data.results);

        const trending = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieid}?api_key=035c0f1a7347b310a5b95929826fc81f`
        );
        setTrendingMovies(trending.data);
      } catch (error) {
        //window.location.href="http://localhost:3000/NetworkError";
        console.error("Error fetching movies:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // function handleIsDownloadClicked() {
  //   setIsDownloadClicked(true);
  //   setInterval(() => setIsDownloadClicked(false), 10000);
  // }

  // function handleWatchNowClicked() {
  //   setIsWatchNowClicked(true);
  //   setInterval(() => setIsWatchNowClicked(false), 10000);
  // }
  function YouTubePlayer({ youTubeId, apiKey }) {
    const playerRef = useRef(null);
  
    useEffect(() => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      window.onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player(playerRef.current, {
          videoId: youTubeId,
          width: '100%',
          height: 600,
          playerVars: {
            autoplay: 1,
            controls: 1,
            disablekb: 0, // Enable keyboard controls
            modestbranding: 1, // Hide YouTube logo
            playsinline: 1, // Allow video to play inline on iOS
            'cc_load_policy': 1, // Enable subtitles by default
            iv_load_policy: 3,
            'hl': 'en'
          },
          events: {
            onReady: onPlayerReady,
          },
        });
  
        function onPlayerReady(event) {
          // Autoplay the video
          event.target.playVideo();
        }
  
        return () => {
          // Clean up player
          player.destroy();
        };
      };
    }, [youTubeId, apiKey]);
  
    return <div ref={playerRef}></div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading ? (
        <SimpleBackDrop />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box
            component="main"
            sx={{
              backgroundColor: "#fff",
              flexGrow: 1,
              height: "100vh",
              width: "100%",
            }}
          >
            <Toolbar />
            <Container maxWidth="100vw" sx={{ mt: 3, mb: 4, pl: 0, pr: 0 }}>
              <Grid container spacing={3}>
                {/* Blur Background on top */}
                <Grid
                  maxWidth="100vw"
                  xs={12}
                  mt={5}
                  ml={{ xs:3, md: 4 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "4rem",
                    height: "50vh",
                    width:"100vw",
                  }}
                >
                  {/* <iframe
                    title="movie"
                    width="100%"
                    height="600"
                    src={`https://www.youtube.com/embed/${youTubeId}`}
                    frameborder="0"
                    allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture" 
                    allowfullscreen
                    autoplay
                    controls
                  ></iframe> */}
                  <YouTubePlayer youTubeId={youTubeId} apiKey={apiKey} />
                </Grid>

                {/* Card to display the movie and its details */}

                {/* Buttons to Download and Stream */}

                {/* movie name on the hero section of the page */}
                <Grid
                  maxWidth="100vw"
                  xs={12}
                  mt={5}
                  ml={{ xs: 1 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: { xs: "25rem", md: "23rem" },
                    marginTop: { xs: "-30rem", md: "-33rem" },
                    zIndex: "1",
                    paddingLeft: { xs: "1rem", md: 0 },
                    //backgroundColor: "red",
                  }}
                >
                  {/* {title of the movie} */}
                 

                {/* Description of the movie */}
            
                  <Typography variant="subtitle2" sx={{ textAlign: "center", marginTop:{xs:"40rem",md:"45rem"} }}>
                  <Typography variant="h5" sx={{ textAlign: "center", }}>
                  🎬{searchInput}🍿
                  </Typography>
                    {trendingMovies.overview
                      ? trendingMovies.overview
                      : "This is the official trailer of the movie! Avoid Scammers, all content is obliged to follow all the terms and policies of the JoKa Movie Point Platform. Enjoy 😊"}
                  </Typography>
                </Grid>

                {/* More like this */}
              </Grid>
            </Container>
            <SarufiChatbox botId={3343} />
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
