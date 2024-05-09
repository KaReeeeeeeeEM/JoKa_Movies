/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Lock from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import PasswordField from "./PasswordField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

let ChangeCredentials = () => {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); // State to track button disabled state
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages

  const { data } = useParams();
  const navigate = useNavigate();
  const receivedPhone = decodeURIComponent(data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const formInfo = {
      password: data.get("password"),
      confirm: data.get("confirm"),
      phoneNumber: receivedPhone,
    };
    //console.log(formInfo.password, formInfo.confirm);
    if (formInfo.password === formInfo.confirm) {
      setErrorMessage(""); // Clear error message
      try {
        const response = await axios.post(
          "https://joka-movies.onrender.com/change-password"                    
                      
  ,
          { formInfo }
        );
        setErrorMessage(""); // Clear error message

        if (response && (response.status === 200 || response.status === 201)) {
          setIsDisabled(false);
          setLoading(false);
          console.log(`Password changed successfully!`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setInterval(() => {
        setLoading(false);
        setIsDisabled(false)},3000);
        console.log("Passwords do not match!");
        setErrorMessage("Passwords do not match!");
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
                <Lock />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                Enter new <span style={{ color: "orange" }}>Password</span>
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ marginTop: 3, width: "60%" }}
              >
                <Grid item xs={12} sm={12}>
                  <PasswordField
                    hint="Enter New Password"
                    id="password"
                    name="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <PasswordField
                    hint="Confirm New Password"
                    id="confirm"
                    name="confirm"
                    isConfirm
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="contained"
                  disabled={isDisabled}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? "Loading..." : "finish"}
                </Button>
                {errorMessage && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {errorMessage}
                  </p>
                )}
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ChangeCredentials;
