
import React from 'react';
import { Grid, Paper, Typography, ListItemIcon, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Header from './Header'; // Import the Header component
import {
  Storefront as StorefrontIcon,
  MonetizationOn as MonetizationOnIcon,
  Receipt as ReceiptIcon,
  PeopleAlt as PeopleAltIcon,
  Assessment as AssessmentIcon,
  LiveHelp as LiveHelpIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const DashboardBody = () => {
  const iconStyle = {
    fontSize: '9rem',
    color: '#F36C00',
    marginBottom: '0.5rem',
  };

  const paperStyle = {
    padding: '2rem',
    textAlign: 'center',
    height: '100%',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  };

  return (
    <>
      <Header />
      <Box mt={3} px={4}>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={paperStyle}>
              {/* <Link to="/ecommerce" style={{ textDecoration: 'none' }}> */}
                <ListItemIcon style={iconStyle}>
                  <StorefrontIcon />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  ECOMMERCE
                </Typography>
              {/* </Link> */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/escrow" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  PAY ESCROW
                </Typography>
              </Link>
            </Paper>
          </Grid>
 <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/billpayment" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
              BILL PAYMENT
                </Typography>
              </Link>
            </Paper>
          </Grid>
           <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={paperStyle}>
              {/* <Link to="/pay-escrow" style={{ textDecoration: 'none' }}> */}
                <ListItemIcon style={iconStyle}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  USER MANAGEMENT
                </Typography>
              {/* </Link> */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={paperStyle}>
              {/* <Link to="/pay-escrow" style={{ textDecoration: 'none' }}> */}
                <ListItemIcon style={iconStyle}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  FINANCIAL ANALYTICS
                </Typography>
              {/* </Link> */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={paperStyle}>
              {/* <Link to="/pay-escrow" style={{ textDecoration: 'none' }}> */}
                <ListItemIcon style={iconStyle}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  CUSTOMER SUPPORT
                </Typography>
              {/* </Link> */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={paperStyle}>
              {/* <Link to="/pay-escrow" style={{ textDecoration: 'none' }}> */}
                <ListItemIcon style={iconStyle}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                 SETTINGS
                </Typography>
              {/* </Link> */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardBody;
