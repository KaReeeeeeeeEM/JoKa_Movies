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
import Placeholder from "../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg";
import { dark } from "@mui/material/styles/createPalette";
import {
  Movie,
  MovieCreation,
  Search,
  SearchOff,
  TrendingUp,
  Tv,
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

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [results, setResults] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { user, search } = useParams();
  const urlSearchParams = new URLSearchParams(window.location.search); // Parse query string
  const profilePicture = urlSearchParams.get("profile");
  const searchInput = urlSearchParams.get("search");
  const pages = urlSearchParams.get("pages");
  //const searchInput = new URLSearchParams(window.location.search).get(search);
  //const searchid = decodeURIComponent(search);

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
    if (searchInput) {
      setResults(searchInput);
    } else {
      setResults(results);
    }
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchMovies = async (currentPage = 1) => {
      try {
        const searchResults = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=035c0f1a7347b310a5b95929826fc81f&query=${searchInput}&page=${currentPage}`
        );
        
        setTotalResults(searchResults.data.total_results);
        // setSearchResults(searchResults.data.results);

        if (currentPage <= pages) {
          // More pages available, continue iterating
          await fetchMovies(currentPage + 1);
          setSearchResults((prevResults) => [...prevResults, ...searchResults.data.results]);
          currentPage++;
        } else {
          setLoading(false);
          console.log(`Search completed with total pages ${searchResults.data.total_pages}`);
        }
      } catch (error) {
        window.location.href = "http://localhost:3000/NetworkError";
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
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
            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Popular movies */}
                <Grid xs={12} mt={5} ml={{ xs: 6, md: 1 }}>
                  <Typography variant="h4">
                    <IconButton>
                      <Search fontSize="large" />
                    </IconButton>
                    <span style={{ color: "orange" }}>{totalResults}</span>{" "}
                    search results for{" "}
                    <span style={{ color: "orange" }}>{searchInput}</span>{" "}
                  </Typography>
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
                    {searchResults.map((movie) => (
                      <Link
                        sx={{ textDecoration: "none" }}
                        href={`http://localhost:3000/SelectedMovie/${movie.id}/${user}?profile=${profile}`}
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
                          year={
                            movie.release_date
                              ? movie.release_date.slice(0, 4)
                              : movie.release_date
                          }
                          poster_path={movie.poster_path || movie.backdrop_path}
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
