'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Alert from '@mui/material/Alert';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Mediset-Archives
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Define an async function
async function loginUser(googleEmail) {
      // Sending the login request
      try {
      const response = await axios.post('http://localhost:8000/apis/oauth/', {
          email: googleEmail,
          password: 'oauth',
      });
    } catch (error) {
      throw Error('Invalid credentials. Please try again.');
    }
}
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending the login request
      const response = await axios.post('http://localhost:8000/apis/login/', {
        username: email,
        password: password,
      });
      if (response.status === 200) {
        router.push('/OwnedSharedDatasets');
      }

    } catch (error) {
      let errorMessage = 'Invalid credentials. Please try again.';
      // if (error.response && error.response.data && error.response.data.detail) {
      //   errorMessage = error.response.data.detail;
      // } else if (error.message) {
      //   errorMessage = error.message;
      // } 
      setError(errorMessage);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address / Username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type= {showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
<br/>
            <GoogleOAuthProvider  clientId="886302518859-fkvi895pf6t8i8svsd8hi46fbfp89n53.apps.googleusercontent.com">
                <GoogleLogin
                    buttonText="Login with Google"
                    onSuccess={response => {
                      const tokenCredentials = response.credential;
                      const decodedCredentials = jwtDecode(tokenCredentials);
                      const googleEmail = decodedCredentials.email;
                      
                      try {
                        loginUser(googleEmail);
                        router.push('/OwnedSharedDatasets');
                      } catch (error) {
                        setError('Google Login failed');
                      }
                  }}
                    onFailure={() => console.log("error")}
                    cookiePolicy={"single_host_origin"}
                />
          </GoogleOAuthProvider>
          </Box>
          {/* [<Button
            onClick={() => signIn('google')
              .then((response) => {
                if (response.ok && response.session) {
                  // Access the user's email from the session data
                  const { user } = response.session;
                  const userEmail = user.email;
                  // Print the user's email to the console
                  console.log('User signed in with email:', userEmail);
                }
              })

            }
            >
            sigin with google
          </Button>] */}
        </Box>
        { error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
