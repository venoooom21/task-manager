import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


import BasicLayout from "Pages/authentication/components/CoverLayout";


import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  const handleSignIn = async (event) => {
    event.preventDefault(); 

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      
      const response = await axios.post('http://localhost:5000/user/sign-in', { email, password });

      if (response.data.success) {
        navigate('/dashboard');
      } else {
        
        setError('Invalid email or password');
      }
    } 
    catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {/* Form submission logic handled with handleSignIn */}
          <MDBox component="form" role="form" onSubmit={handleSignIn}>
            {/* Email input */}
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            {/* Password input */}
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            {/* Remember Me toggle */}
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            {/* Error message */}
            {error && (
              <MDBox mt={2} mb={1}>
                <MDTypography variant="caption" color="error" textAlign="center">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            {/* Sign in button */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign in
              </MDButton>
            </MDBox>
            {/* Link to Sign-Up page */}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
