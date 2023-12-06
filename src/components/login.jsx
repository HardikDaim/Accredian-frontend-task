import React, { useState } from "react";
import {Link} from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import Lottie from "lottie-react";
import Header from "./header.jsx";
import LoginAnimation from "../animations/Login-Animation.json";
import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const backendUrl = "http://localhost:3001";

    fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login response
        console.log("Login successful:", data);
        setOpenSuccessAlert(true);
      })
      .catch((error) => {
        // Handle error
        console.error("Error during login:", error);
        setOpenErrorAlert(true);
      });
  };

  const handleCloseSuccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
  };

  const handleCloseErrorAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorAlert(false);
  };
  return (
    <>
      <Header />
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          lg={6}
          container
          justifyContent="center"
          alignItems="center"
        >
          {/* Content for the left side */}
          <Paper style={{ width: "75%", height: "60%" }}>
            <Lottie animationData={LoginAnimation} />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6} sx={{ marginTop: "10rem" ,marginBottom:"4rem"}}>
          {/* Content for the right side */}
          <Typography
            sx={{
              fontFamily: "'Roboto', sans-serif",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "transparent",
              background:
                "linear-gradient(to right, #add8e6, #ffc0cb, #fffacd)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Welcome to Accredian
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Roboto', sans-serif",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            Login Now!
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginBottom: "1rem", margin: "1rem" }}>
              <TextField
                label="Username or Email"
                fullWidth
                required
                name="usernameOrEmail"
                value={credentials.usernameOrEmail}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "1rem", margin: "1rem" }}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
            >
              <Typography
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  textDecoration: "none",
                }}
              >
                Don't have an account?{" "}
                <Link to="/"
                  style={{
                    textDecoration: "none",
                    color: "#90caf9",
                    cursor: "pointer",
                    fontWeight:"700"
                  }}
                >
                  SignUp Now
                </Link>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Button
                size="large"
                endIcon={<LoginIcon />}
                sx={{
                  alignItems: "center",
                  margin: "1rem",
                  textAlign: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                  marginBottom: "4rem !important",
                }}
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={handleCloseSuccessAlert}
      >
        <Alert onClose={handleCloseSuccessAlert} severity="success">
          Login Successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleCloseErrorAlert}
      >
        <Alert onClose={handleCloseErrorAlert} severity="error">
          Invalid credentials. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
}
