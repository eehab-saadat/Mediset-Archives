import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    common: {
      white: '#fff', // Explicitly define white for clarity
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8, // Set default spacing globally
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xs', // Set default container size (adjust as needed)
      },
      styleOverrides: {
        root: {
          marginTop: '5px', // Apply global margin-top
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          margin: 'theme.spacing(1)',
          backgroundColor: '#000000', // Use Material-UI's palette
        },
      },
    },
    MuiForm: {
      styleOverrides: {
        root: {
          width: '100%', // Fix IE 11 issue
          marginTop: 'theme.spacing(3)', // Apply global form margin-top
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          margin: 'theme.spacing(3, 0, 2)', // Apply spacing to submit button
        },
      },
    },
  },
});

export default theme;
