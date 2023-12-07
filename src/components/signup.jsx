import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import Header from "./header.jsx";
import LoginIcon from "@mui/icons-material/Login";
import Lottie from "lottie-react";
import SignupAnimation from "../animations/Signup-Animation.json";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSignup = () => {
    // Add logic for handling signup
    const backendUrl = "http://localhost:3001";

    fetch(`${backendUrl}/api/signup`, {
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
        // Handle successful signup response
        console.log("Signup successful:", data);
        setOpenSuccessAlert(true);
      })
      .catch((error) => {
        // Handle error
        console.error("Error during signup:", error);
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
          <Paper
            sx={{
              width: { xs: "65%", md: "75%", lg: "75%", xl: "75%" },
              height: { xs: "65%", md: "65%", lg: "65%", xl: "65%" },
              marginTop: { xs: "4rem", lg: "0rem" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Assuming you have the Lottie animation data */}
            {/* Replace `animationData={SignupAnimation}` with your actual animation data */}
            <Lottie animationData={SignupAnimation} />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{ marginTop: { xs: "5rem", lg: "10rem" } }}
        >
          <Typography
            sx={{
              fontFamily: "'Roboto', sans-serif",
              textAlign: "center",
              fontSize: {
                xs: "2rem",
                sm: "3rem",
                md: "3rem",
                lg: "3rem",
                xl: "3rem",
              },
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
          {/* <Typography
            sx={{
              fontFamily: "'Roboto', sans-serif",
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            SignUp Now!
          </Typography> */}
          <Typography
            sx={{
              fontFamily: "'Roboto', sans-serif",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Enter your credentials to create your account
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10} sm={5} md={5} lg={4} xl={3}>
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                SignUp with Google
              </Button>
            </Grid>
            <Grid item xs={10} sm={5} md={5} lg={4} xl={3}>
              <Button fullWidth variant="outlined" startIcon={<AppleIcon />}>
                SignUp with Apple
              </Button>
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <Divider
                orientation="horizontal"
                flexItem
                sx={{ color: "gray", paddingTop: "1rem" }}
              >
                OR
              </Divider>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "1rem", margin: "1rem" }}>
              <TextField
                label="Username"
                fullWidth
                required
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "1rem", margin: "1rem" }}>
              <TextField
                label="Email"
                fullWidth
                required
                name="email"
                value={credentials.email}
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
            <Grid item xs={12} sx={{ margin: "1rem" }}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "1rem", margin: "1rem" }}>
              <Typography
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  textDecoration: "none",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#90caf9",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  Login Now
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
                variant="contained"
                size="large"
                endIcon={<LoginIcon />}
                color="primary"
                sx={{
                  alignItems: "center",
                  margin: "1rem",
                  textAlign: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                  marginBottom: "4rem !important",
                }}
                onClick={handleSignup}
                // disabled={
                //   !credentials.username ||
                //   !credentials.email ||
                //   !credentials.password ||
                //   credentials.password !== credentials.confirmPassword
                // }
              >
                Signup
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
          Signup Successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleCloseErrorAlert}
      >
        <Alert onClose={handleCloseErrorAlert} severity="error">
          Error during signup. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
}
