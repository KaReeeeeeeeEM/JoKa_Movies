/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Card from "./Card";
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
import { dark } from "@mui/material/styles/createPalette";
import { Movie, MovieCreation, TrendingUp, Tv } from "@mui/icons-material";
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

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const { user } = useParams();
  const urlSearchParams = new URLSearchParams(window.location.search); // Parse query string
  const profilePicture = urlSearchParams.get("profile");

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
  }, [user, profilePicture]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchMovies = async (currentPage = 10) => {
      try {
        const popular = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=035c0f1a7347b310a5b95929826fc81f&language=en-US&page=${currentPage}`
        );
        //setPopularMovies(popular.data.results);

        const trending = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=035c0f1a7347b310a5b95929826fc81f&page=${currentPage}`
        );
        //setTrendingMovies(trending.data.results);

        const upcoming = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=035c0f1a7347b310a5b95929826fc81f`
        );
        //setUpcomingMovies(upcoming.data.results);

        if (currentPage <= 15) {
          // More pages available, continue iterating
          await fetchMovies(currentPage + 1);
          setPopularMovies((prevResults) => [
            ...prevResults,
            ...popular.data.results,
          ]);
          setTrendingMovies((prevResults) => [
            ...prevResults,
            ...trending.data.results,
          ]);
          setUpcomingMovies((prevResults) => [
            ...prevResults,
            ...upcoming.data.results,
          ]);
          setLoading(true);
          currentPage++;
        } else {
          setLoading(false);
          console.log(
            `Search completed with total pages ${trending.data.total_pages}`
          );
        }
      } catch (error) {
        window.location.href = "http://localhost:3000/NetworkError";
        console.error("Error fetching movies:", error);
      } finally {
        setTimeout(() => setLoading(false), 10000);
      }
    };

    fetchMovies();
  }, []);

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
              <TopBar profile={profilePicture} />
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
            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Popular movies */}
                <Grid xs={12} mt={5} ml={{ xs: 6, md: 1 }}>
                  {user ? (
                    <Typography variant="h4">
                      <IconButton>
                        <MovieCreation fontSize="large" />
                      </IconButton>
                      <span style={{ color: "orange" }}>Popular</span> Movies
                      for <span style={{ color: "orange" }}>{username}</span>
                    </Typography>
                  ) : (
                    <Typography variant="h4">
                      <IconButton>
                        <MovieCreation fontSize="large" />
                      </IconButton>
                      <span style={{ color: "orange" }}>Popular</span> Movies
                    </Typography>
                  )}
                  <Grid
                    xs={12}
                    md={12}
                    mt={3}
                    sx={{
                      display: "flex",
                      alignItems: { md: "center" },
                      flexWrap: "wrap",
                      overflowX: "auto",
                    }}
                  >
                    {popularMovies.map((movie) => (
                      <Link
                        sx={{ textDecoration: "none" }}
                        href={`http://localhost:3000/SelectedMovie/${movie.id}/${user}?profile=${profile}&related=${movie.original_title|| movie.original_title}`}
                      >
                        <Card
                          key={movie.id}
                          movie={
                            movie.original_title.length > 30
                              ? movie.original_title.substring(0, 30) + "..."
                              : movie.original_title
                          }
                          year={movie.release_date.slice(0, 4)}
                          poster_path={movie.poster_path}
                        />
                      </Link>
                    ))}
                  </Grid>
                </Grid>
                {/* Trending movies */}
                <Grid xs={12} mt={5} ml={{ xs: 4, md: 1 }}>
                  <Typography variant="h4">
                    <IconButton>
                      <TrendingUp fontSize="large" />
                    </IconButton>
                    <span style={{ color: "orange" }}>Trending</span> Movies &
                    Shows
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
                    {trendingMovies.map((movie) => (
                      <Link
                        sx={{ textDecoration: "none" }}
                        href={`http://localhost:3000/SelectedMovie/${movie.id}/${user}?profile=${profile}&related=${movie.original_title || movie.original_title}`}
                      >
                        <Card
                          key={movie.id}
                          movie={
                            movie.title > 30
                              ? movie.title.substring(0, 30)
                              : movie.title || movie.original_title > 30
                              ? movie.original_title.substring(0, 30)
                              : movie.original_title || movie.name > 30
                              ? movie.name.substring(0, 30) + "..."
                              : movie.name
                          }
                          media={movie.media_type.toUpperCase()}
                          rating={Math.ceil(movie.vote_average * 10) / 10}
                          poster_path={movie.poster_path || movie.backdrop_path}
                          star={<Star />}
                        />
                      </Link>
                    ))}
                  </Grid>
                </Grid>

                {/* Recent Orders */}
                <Grid xs={12} mt={5} ml={{ xs: 4, md: 1 }}>
                  <Typography variant="h4">
                    <IconButton>
                      <IconButton fontSize="large">
                        <LightbulbIcon fontSize="large" />
                      </IconButton>
                    </IconButton>
                    <span style={{ color: "orange" }}>Featured</span> Content{" "}
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
                    {upcomingMovies.map((movie) => (
                      <Link
                        sx={{ textDecoration: "none" }}
                        href={`http://localhost:3000/SelectedMovie/${movie.id}/${user}?profile=${profile}&related=${ movie.original_title || movie.original_title}`}
                      >
                        <Card
                          key={movie.id}
                          movie={
                            movie.title > 30
                              ? movie.title.substring(0, 30)
                              : movie.title || movie.original_title > 30
                              ? movie.original_title.substring(0, 30) + "..."
                              : movie.original_title || movie.name > 30
                              ? movie.name.substring(0, 30) + "..."
                              : movie.name
                          }
                          year={movie.release_date.slice(0, 4)}
                          rating={
                            movie.vote_average === 0
                              ? "5.5"
                              : movie.vote_average
                          }
                          poster_path={movie.backdrop_path}
                          star={<Star />}
                        />
                      </Link>
                    ))}
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
