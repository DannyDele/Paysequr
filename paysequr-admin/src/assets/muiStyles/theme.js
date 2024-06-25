import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    textGray700: {
      main: '#374151', // Adjust the color code as per your requirement
    },
    // Add more custom colors as needed
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontSizeLarge: {
      fontSize: '1rem', // Example of custom font size
    },
    globalClass: {
      fontSize: '1.7rem', // Adjust the font size as needed
      color: '#374151', // Adjust the color code as per your requirement
    },
    // Add more custom typography styles as needed
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small', // Set all buttons to small size by default
      },
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
  },
});

export default theme;
