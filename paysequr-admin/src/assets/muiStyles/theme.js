import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    success: {
      main: '#4caf50', // Define your success color here
    },
    // Define other colors as needed
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Set Poppins as the default font family
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
