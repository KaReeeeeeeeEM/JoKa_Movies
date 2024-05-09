/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIcon from "@mui/icons-material/Phone";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

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

let ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("+255");
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages
  const [isDisabled, setIsDisabled] = useState(false); // State to track button disabled state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setLoading(true); //activate the spinner

    try {
      const response = await axios.post("http://localhost:5000/api/send-code", { phoneNumber });
      setErrorMessage(""); // Clear error message
      
      if (response && (response.status === 200 || response.status === 201)) {
        navigate('/SentCode/' + encodeURIComponent(phoneNumber) + `?code=${response.data.code}`);
      }
    } catch (error) {
      console.error("Error sending SMS:", error.response?.data || error.message);
      console.log(error)
      setErrorMessage(`Error! Please try again. ${error.response?.data.message}`);
    } finally {
      setIsDisabled(false);
      setLoading(false);
    }    
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={8} md={12}>
          <Container
            component="main"
            maxWidth="md"
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
                <KeyIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                Password Recovery
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ marginTop: 3, width: "60%" }}
              >
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="tel"
                    required
                    fullWidth
                    id="tel"
                    label="Enter your phone number"
                    name="phone"
                    autoComplete="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <PhoneIcon sx={{ color: "orange" }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={styles.inputStyles}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="contained"
                  disabled={isDisabled}
                  onClick={handleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading? 'Loading...' :'Send Code'}
                </Button>
                <Grid>
                  <Typography
                    component="h4"
                    variant="body2"
                    sx={{ mb: 2, fontWeight: "bold",textAlign:"center"  }}
                  >
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </Typography>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotPassword;
