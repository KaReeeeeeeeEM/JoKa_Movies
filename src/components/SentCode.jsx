/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
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
import Lock from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
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

let SentCode = (event) => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages
  const [isDisabled, setIsDisabled] = useState(false); // State to track button disabled state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { data } = useParams();
  const receivedPhone = decodeURIComponent(data); // Decode the data
  const urlSearchParams = new URLSearchParams(window.location.search); // Parse query string
  const codeSent = urlSearchParams.get('code');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsDisabled(true);
    setLoading(true); //activate the spinner

    try {
      const response = await axios.post(
        `https://joka-movies.onrender.com/api/verify-code/${codeSent}`,
        { code, phoneNumber: receivedPhone }
      );
      setErrorMessage(""); // Clear error message
      console.log(response.data);

      if (code === response.data.code) {
        console.log(`Code verified successfully with number ${receivedPhone}`);
        navigate("/ChangeCredentials/" + encodeURIComponent(receivedPhone));
      } else {
        console.log("Error fetching code from server for comparison");
      }
    } catch (error) {
      console.error("Invalid Code:", error.response?.data || error.message);
      setErrorMessage("The code you entered is invalid!. Please try again.");
    } finally {
      setIsDisabled(false);
      setLoading(false); //deactivate the spinner
    }
  };

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
                <SendIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                Enter 6-digit code sent to
                <span style={{ color: "orange" }}> {receivedPhone}.</span>
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
                    label="Enter code"
                    name="code"
                    autoComplete="phone"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            sx={{
                              color: "orange",
                            }}
                          >
                            <Lock />
                            {" - "}
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
                  {loading ? "Loading..." : "Confirm"}
                </Button>
                <Grid>
                  <Typography
                    component="h4"
                    variant="body2"
                    sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
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

export default SentCode;
