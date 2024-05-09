import { NetworkLocked } from "@mui/icons-material";
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
    color: "#DA4C0A",
  },
  caption: {
    color: "#aaa",
    textAlign:"center",
  }
};

const NetworkError = () => {
  return (
    <div style={styles.page}>
      <Container>
        <Grid>
          <h3 style={styles.title}>
            <NetworkLocked />
          </h3>
          <h2 style={styles.title}>
            Network <span style={styles.span}>Error</span>
          </h2>
          <h4 style={styles.caption}>Please make sure you have a stable internet connection</h4>
        </Grid>
      </Container>
    </div>
  );
};

export default NetworkError;
