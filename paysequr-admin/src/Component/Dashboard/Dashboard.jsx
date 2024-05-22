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
import AnnouncementIcon from '@mui/icons-material/Announcement';

const DashboardBody = () => {
  const iconStyle = {
    fontSize: '5rem', // Font size increased to 5rem
    color: '#F36C00',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
        <Grid container spacing={3} justifyContent="center" alignItems="stretch"  >
          {/* First Row */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/ecommerce" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <StorefrontIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  ECOMMERCE
                </Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/escrow" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <MonetizationOnIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  PAY ESCROW
                </Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/billpayment" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <ReceiptIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  BILL PAYMENT
                </Typography>
              </Link>
            </Paper>
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/user-management" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <PeopleAltIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  USER MANAGEMENT
                </Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/financial-analysis" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <AssessmentIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  FINANCIAL ANALYTICS
                </Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              {/* <Link to="/customer-support" style={{ textDecoration: 'none' }}> */}
                <ListItemIcon style={iconStyle}>
                  <LiveHelpIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  CUSTOMER SUPPORT
                </Typography>
              {/* </Link> */}
            </Paper>
          </Grid>

          {/* Third Row */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/report-analytics" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <LiveHelpIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  REPORT ANALYTICS
                </Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/settings" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <SettingsIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  SETTINGS
                </Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Link to="/announcement" style={{ textDecoration: 'none' }}>
                <ListItemIcon style={iconStyle}>
                  <AnnouncementIcon sx={{ fontSize: 50, color: '#F36C00' }} />
                </ListItemIcon>
                <Typography variant="h5" gutterBottom>
                  ANNOUNCEMENT
                </Typography>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardBody;
