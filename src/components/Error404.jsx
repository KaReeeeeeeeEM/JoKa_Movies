import { Container, Grid } from "@mui/material";
import React from "react";

const styles = {
  title: {
    textAlign: "center",
    fontStyle: "bold",
    color: "white",
  },
  subtitle: {
    textAlign: "center",
    color: "white",
  },
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#201F1F",
  },
  span: {
    color: "orange",
  },
};

const Error404 = () => {
  return (
    <div style={styles.page}>
    <Container>
      <Grid>
        <h2 style={styles.title}>
          Error <span style={styles.span}>404</span>
        </h2>
        <h3 style={styles.title}>Page not found!</h3>
      </Grid>
    </Container>
    </div>
  );
};

export default Error404;
