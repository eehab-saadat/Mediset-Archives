import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      // Handle successful login (redirect, etc.)
    } catch (error) {
      setError(error.response.data.message || 'Login failed');
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12} sm={4}>
        <Typography variant="h2" gutterBottom>
          Sign in
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Stay updated on your professional world
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email or Phone"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" type="submit" color="primary" fullWidth sx={{ mt: 3 }}>
            Sign in
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;