/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import { Container, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import GoogleOutlinedIcon from "@mui/icons-material/Google";

let GoogleSignIn = () => {
  return (
    <a
      href="http://localhost:5000/auth/google"
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      Sign In With Google <GoogleOutlinedIcon  sx={{width:"15px", height:"15px",marginBottom:"-2.5px",color:"red"}} />
    </a>
  );
};

const SocialMediaList = () => {
  return (
    <Container maxWidth="md">
    <Typography variant="h5" mb={4} mt={2} sx={{color:"orange"}} align="center" gutterBottom>
      OR
    </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Button variant="outlined" xs={12} color="warning" sx={{ color: "#EA4335" }}>
          <GoogleSignIn />
        </Button>
      </Grid>
    </Container>
  );
};

export default SocialMediaList;
