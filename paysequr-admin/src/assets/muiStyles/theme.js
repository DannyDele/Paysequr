import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    success: {
      main: '#4caf50', // Define your success color here
    },
    // Define other colors as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
  },
});

export default theme;
