/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper"; 
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "./Logo";
import Lock from "@mui/icons-material/Lock";
import PasswordField from "./PasswordField";
import SocialMediaList from "./SocialMediaList";
import { Email } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        sx={{ textDecoration: "none", color: "orange" }}
        href="https://mui.com/"
      >
        jokamoviepoint@gmail.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const myImages = [
  "https://img.freepik.com/free-vector/realistic-horror-movie-poster_23-2149721019.jpg?size=626&ext=jpg&ga=GA1.1.1371621238.1709616963&semt=ais",
  "https://mcdn.wallpapersafari.com/medium/32/83/Pi9BhL.jpg",
  "https://mcdn.wallpapersafari.com/medium/59/71/3MdqnY.jpg",
  "https://mcdn.wallpapersafari.com/medium/35/30/dgeyLj.jpg",
  "https://mcdn.wallpapersafari.com/medium/71/33/DMbmeR.jpg",
  "https://mcdn.wallpapersafari.com/medium/19/14/9cuK5I.jpg",
  "https://mcdn.wallpapersafari.com/medium/57/99/6xbIS2.jpg",
  "https://mcdn.wallpapersafari.com/medium/74/55/PgpxEZ.jpg",
  "https://mcdn.wallpapersafari.com/medium/55/60/x0fPNR.jpg",
  "https://mcdn.wallpapersafari.com/medium/11/32/gdDW48.jpg",
  "https://mcdn.wallpapersafari.com/medium/46/85/OxdmqA.jpg",
  "https://mcdn.wallpapersafari.com/medium/67/53/RyDnS1.jpg",
  "https://mcdn.wallpapersafari.com/medium/34/0/edfKaS.jpg",
  "https://mcdn.wallpapersafari.com/medium/65/89/qL0iYX.jpg",
  "https://mcdn.wallpapersafari.com/medium/3/65/eTbMAS.jpg",
  "https://mcdn.wallpapersafari.com/medium/94/35/WuzGlY.jpg",
  "https://mcdn.wallpapersafari.com/medium/14/26/KuWlLr.jpg",
  "https://mcdn.wallpapersafari.com/medium/3/7/zZODtH.jpg",
  "https://mcdn.wallpapersafari.com/medium/29/87/ohPiUT.jpg",
  "https://mcdn.wallpapersafari.com/medium/51/22/Qvtlmp.jpg",
  "https://mcdn.wallpapersafari.com/medium/55/53/VYsbxl.jpg",
  "https://mcdn.wallpapersafari.com/medium/75/19/QJjap2.jpg",
  "https://mcdn.wallpapersafari.com/medium/60/67/fMvHTo.jpg",
  "https://mcdn.wallpapersafari.com/medium/56/11/eABl0y.jpg",
];

let RandomImage = () => {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * myImages.length);
    setCurrentImage(myImages[randomIndex]);
  }, []); // Empty dependency array to run effect only on mount
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={6}
      sx={{
        backgroundImage: `url(${currentImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(60%)",
      }}
    />
  );
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const styles = {
  inputStyles: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "orange",
    },
    "& .MuiInputLabel-root": {
      color: "orange",
    },
    "& .transformed .MuiInputLabel-root": {
      color: "orange !important",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "orange !important",
    },
  },
};

let SignInSide = () => {
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages
  
  let handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      if (response.status === 200) {
        console.log("Login successful", response.data);
        setErrorMessage(""); // Clear error message
        window.location.href = response.data.redirectTo;
      } else if (response.status === 401) {
        setErrorMessage(response.data.message); // Display error message from server (e.g., "Invalid email or password")
        window.location.href = response.data.redirectTo;
      } else {
        console.error("Unexpected response:", response); // Handle other potential errors
        window.location.href = response.data.redirectTo;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occured during signing in, please try again!");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <RandomImage />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "warning" }}>
              JoKa Movies 🎬 - <span style={{ color: "orange" }}>Sign In</span>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        sx={{
                          color: "orange",
                        }}
                      >
                        <Email />
                        {"  "}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={styles.inputStyles}
                autoFocus
              />
              <PasswordField hint="Password" name="password" />
              <FormControlLabel
                control={<Checkbox value="remember" color="warning" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                color="warning"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid>
                  <Typography
                    component="h4"
                    variant="body2"
                    sx={{ mb: 2, fontWeight: "bold", textAlign:"center" }}
                  >
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </Typography>
                </Grid>
              {RandomImage}
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/ForgotPassword"
                    variant="body2"
                    sx={{ textDecoration: "none", color: "orange" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/SignUp"
                    variant="body2"
                    sx={{ textDecoration: "none", color: "#333" }}
                  >
                    Don't have an account?{" "}
                    <span style={{ color: "orange" }}>Sign Up</span>
                  </Link>
                </Grid>
               
              </Grid>
              <SocialMediaList />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
