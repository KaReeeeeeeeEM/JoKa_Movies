/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import {
  Check,
  ConfirmationNumber,
  Email,
  Password,
  Phone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";

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
  "https://images2.alphacoders.com/724/thumb-440-724132.webp",
  "https://images.alphacoders.com/133/thumb-440-1337271.webp",
  "https://images4.alphacoders.com/133/thumb-440-1337269.webp",
  "https://picfiles.alphacoders.com/458/thumb-1920-458829.jpg",
  "https://picfiles.alphacoders.com/117/thumb-1920-117397.jpg",
  "https://images2.alphacoders.com/135/thumb-440-1351373.webp",
  "https://images2.alphacoders.com/135/thumb-440-1351374.webp",
  "https://picfiles.alphacoders.com/645/thumb-800-645230.webp",
  "https://picfiles.alphacoders.com/533/thumb-1920-533035.png",
  "https://images5.alphacoders.com/329/thumb-440-329544.webp",
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

export default function SignUp() {
  const [ phoneNumber, setPhoneNumber ] = useState("+255")
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formInfo = {
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
      confirm: data.get("confirm"),
    };

    console.log(`A new user ${formInfo.email} and phone number ${formInfo.phone} is trying to sign up`); //log the form data  in the console so we can see it
if(formInfo.email && formInfo.password && formInfo.phone && formInfo.confirm){
  const email = formInfo.email;
  const phone = formInfo.phone;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setErrorMessage('Invalid email address! Please enter a valid email format.');  
  } else if ( ! /^((?:\+255)?[ \t\n]*0\d{9})|((?:\+255)?[ \t\n]*\d{10})$/.test(phone)) {
    setErrorMessage('Invalid phone number! Please a valid Tanzanian room number.');  
  } else if ( formInfo.password.length < 8) {
    setErrorMessage('Password must be at least 8 characters long.');
  } else if (formInfo.password !== formInfo.confirm) {
      setErrorMessage("Passwords do not match!");
    } else { 
      try {
        setIsClicked(true);
        const response = await axios.post(
          "https://joka-movies.onrender.com/api/submit-form"                   
  ,
          { formInfo }
        );
        if (response.status === 200) {
          console.log(response);
          window.location.href = response.data.redirectTo; // Redirect to "/Dashboard"
          setErrorMessage(""); // Clear error message
        }
      } catch (error) {
        console.error(
          "Error signing up:",
          error.response?.data || error.message
        );
        setErrorMessage(
          error.response?.data.message
        );
      } finally{
        setIsClicked(false);
      }
    } 
} else {
  setErrorMessage("Please fill all the fields!" )
}
};

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // function handleClick() {
  //   setIsClicked(true);
  //   setInterval(() => {
  //     setIsClicked(false);
  //   }, 3000);
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              backgroundColor: "white",
              padding: "0 2rem",
              borderRadius: "1rem",
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                JoKa Movies 🎬 -{" "}
                <span style={{ color: "orange" }}>Sign Up</span>
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="phone"
                      name="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete="phone"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              sx={{
                                color: "orange",
                              }}
                            >
                              <Phone />
                              {"  "}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={styles.inputStyles}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              sx={{
                                color: "orange",
                              }}
                            >
                              <Password />
                              {"  "}
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                              {showPassword ? (
                                <VisibilityOff sx={{ color: "orange" }} />
                              ) : (
                                <Visibility sx={{ color: "orange" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="new-password"
                      sx={styles.inputStyles}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirm"
                      label="Confirm Password"
                      type={showPassword ? "text" : "password"}
                      id="confirm"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              sx={{
                                color: "orange",
                              }}
                            >
                              <Check />
                              {"  "}
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                              {showPassword ? (
                                <VisibilityOff sx={{ color: "orange" }} />
                              ) : (
                                <Visibility sx={{ color: "orange" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="new-password"
                      sx={styles.inputStyles}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="warning" />
                      }
                      label="I want to receive updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  disabled={isClicked}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isClicked ? <CircularProgress sx={{color:"orange"}} /> : "Sign Up"}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      href="/SignInSide"
                      variant="body2"
                      sx={{ textDecoration: "none", color: "#333" }}
                    >
                      Already have an account?{" "}
                      <span style={{ color: "orange", fontStyle: "bolder" }}>
                        Sign In
                      </span>
                    </Link>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography
                    component="h4"
                    variant="body2"
                    sx={{ mb: 2, fontWeight: "bold", textAlign:"center"  }}
                  >
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </Typography>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
        <CssBaseline />
        <RandomImage />
      </Grid>
    </ThemeProvider>
  );
}
