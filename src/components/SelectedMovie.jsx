/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
  MovieCreationOutlined,
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
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { user, movie_id } = useParams();
  const urlSearchParams = new URLSearchParams(window.location.search); // Parse query string
  const profilePicture = urlSearchParams.get("profile");
  const movieid = decodeURIComponent(movie_id);
  const searchInput = urlSearchParams.get("related");

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
    const fetchMovies = async (currentPage = 1) => {
      try {
        // const related = await axios.get(
        //   `https://api.themoviedb.org/3/tv/top_rated?api_key=035c0f1a7347b310a5b95929826fc81f&language=en-US`
        // );

        //setRelatedMovies(related.data.results);

        const related = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=035c0f1a7347b310a5b95929826fc81f&query=${searchInput.substring(0,searchInput.length/2)}&page=${currentPage}`
        );
        
        //setRelatedMovies(searchResults.data.total_results);
        // setSearchResults(searchResults.data.results);

        const trending = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieid}?api_key=035c0f1a7347b310a5b95929826fc81f`
        );
        setTrendingMovies(trending.data);

        if (currentPage <= 2) {
          // More pages available, continue iterating
          await fetchMovies(currentPage + 1);
          setRelatedMovies((prevResults) => [...prevResults, ...related.data.results]);
          currentPage++;
        } else {
          setLoading(false);
          console.log(`Search completed with total pages ${related.data.total_pages}`);
        }

        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=035c0f1a7347b310a5b95929826fc81f`
          );
          
          // Find the first video that is from YouTube
          const youTubeVideo = response.data.results.find(
            (video) => video.site === "YouTube"
          );
          if (youTubeVideo) {
            console.log(response.data);
            setTrendingMovies({
              ...trending.data,
              youTubeVideoId: youTubeVideo.key,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        //window.location.href = "http://localhost:3000/NetworkError";
        console.error("Error fetching movies:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  function handleIsDownloadClicked() {
    setIsDownloadClicked(true);
    setInterval(() => {
      setIsDownloadClicked(false);
    }, 3000);
  }

  function handleWatchNowClicked() {
    setIsWatchNowClicked(true);
    setInterval(() => {
      window.location.href = `/PlayMovie?search=${
        trendingMovies.title ||
        trendingMovies.original_title ||
        trendingMovies.name
      }&videoId=${trendingMovies.youTubeVideoId}`;
      setIsWatchNowClicked(false);
    }, 3000);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading ? (
        <SimpleBackDrop />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer variant="permanent">
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <TopBar profile={profile} />
            </Toolbar>
            <Divider />
            <MainListItems />
          </Drawer>
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
                  ml={{ md: 1 }}
                  sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
                      trendingMovies.poster_path || trendingMovies.backdrop_path
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-4rem",
                    height: "50vh",
                    filter: "blur(2px) brightness(50%)",
                  }}
                ></Grid>

                {/* Card to display the movie and its details */}
                <Grid
                  maxWidth="100vw"
                  xs={12}
                  mt={5}
                  ml={{ xs: 4, md: 1 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-8rem",
                  }}
                >
                  <Card2
                    year={
                      trendingMovies.release_date.substring(0, 4) 
                    }
                    border="3px solid orange"
                    poster_path={
                      trendingMovies.poster_path || trendingMovies.backdrop_path
                    }
                  />
                </Grid>

                {/* Buttons to Download and Stream */}
                <Grid
                  maxWidth="100vw"
                  xs={12}
                  mt={5}
                  ml={{ xs: 4, md: 1 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "space-between" },
                    alignItems: "center",
                    flexDirection: { xs: "column", md: "row" },
                    marginTop: { xs: "1rem", md: "-13rem" },
                    marginBottom: { xs: "-10rem", md: "3rem" },
                    backgroundColor: "#eee",
                  }}
                >
                  <IconButton
                    sx={{
                      padding: { xs: "0.5rem", md: "1rem" },
                      marginTop: { xs: "1rem", md: 0 },
                      marginLeft: { md: "2rem" },
                      width: { xs: "12rem", md: "20rem" },
                      color: "white",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                        opacity: "50%",
                        border: "2px solid black",
                        color: "black",
                      },
                      backgroundColor: "green",
                      borderRadius: "2px",
                    }}
                    onClick={handleIsDownloadClicked}
                  >
                    {isDownloadClicked ? (
                      <CircularProgress
                        sx={{ color: "orange" }}
                        fontSize="large"
                      />
                    ) : (
                      <Download />
                    )}
                    {isDownloadClicked ? "" : "Download"}
                  </IconButton>
                  <IconButton
                    sx={{
                      padding: { xs: "0.5rem", md: "1rem" },
                      marginTop: { xs: "1rem", md: 0 },
                      marginRight: { md: "2rem" },
                      width: { xs: "12rem", md: "20rem" },
                      color: "white",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                        opacity: "50%",
                        border: "2px solid black",
                        color: "black",
                      },
                      backgroundColor: "orange",
                      borderRadius: "2px",
                    }}
                    onClick={handleWatchNowClicked}
                  >
                    {isWatchNowClicked ? (
                      <CircularProgress
                        sx={{ color: "#333" }}
                        fontSize="large"
                      />
                    ) : (
                      <MovieCreationOutlined />
                    )}
                    {isWatchNowClicked ? "" : "Watch Trailer"}
                  </IconButton>
                </Grid>

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
                  <Typography
                    sx={{
                      fontSize: { xs: "2rem", md: "4rem" },
                      textAlign: "center",
                      color: "white",
                      letterSpacing: { xs: "6px", md: "25px" },
                    }}
                  >
                    {trendingMovies.title ||
                      trendingMovies.original_title ||
                      trendingMovies.name}
                  </Typography>
                </Grid>

                {/* Description of the movie */}
                <Grid
                  maxWidth="100vw"
                  xs={12}
                  ml={{ xs: 4, md: 1 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "space-between" },
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: { xs: "10rem", md: "4rem" },
                    marginBottom: { xs: "-10rem", md: "3rem" },
                    //backgroundColor: "green",
                  }}
                >
                  <IconButton
                    sx={{
                      padding: { xs: "0.5rem", md: "1rem" },
                      marginTop: { xs: "1rem", md: 0 },
                      //marginLeft: { md: "2rem" },
                      width: { xs: "12rem", md: "20rem" },
                      color: "orange",
                      borderRadius: "2px",
                    }}
                  >
                    <Description /> Description of the Movie
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                    {trendingMovies.overview
                      ? trendingMovies.overview
                      : "No Description Available!"}
                  </Typography>

                  <Typography variant="h6">
                    <RemoveRedEye sx={{ color: "orange", marginTop: "3rem" }} />{" "}
                    {Math.ceil(Math.random() * 10)}K |{" "}
                    <ThumbUp sx={{ color: "orange" }} />{" "}
                    {Math.ceil(Math.random() * 10)}K |{" "}
                    <ThumbDown sx={{ color: "orange" }} />{" "}
                    {Math.ceil(Math.random() * 10)}
                  </Typography>
                </Grid>

                {/* More like this */}
                <Grid
                  maxWidth="100vw"
                  xs={12}
                  mt={5}
                  ml={{ md: 1 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: { xs: "10rem", md: "-3rem" },
                    marginBottom: { xs: 0, md: "3rem" },
                    //backgroundColor: "green",
                  }}
                >
                  <Grid xs={12} mt={20} ml={{ xs: 8, md: 1 }}>
                    <Typography variant="h4" sx={{textAlign:"center"}}>
                      <span style={{ color: "orange" }}>
                        Other
                      </span>{" "}
                      Content
                    </Typography>
                    <Grid
                      xs={12}
                      md={12}
                      mt={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {relatedMovies.map((movie) => (
                        <Link
                          sx={{ textDecoration: "none" }}
                          href={`http://localhost:3000/SelectedMovie/${movie.id}/${user}?profile=${profile}&related=${movie.original_title || movie.original_title}`}
                        >
                          <Card
                            key={movie.id}
                            movie={
                              movie.title || movie.original_title || movie.name
                            }
                            poster_path={
                              movie.poster_path || movie.backdrop_path
                            }
                          />
                        </Link>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <SarufiChatbox botId={3343} />
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
