import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, AppBar, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { SettingsOutlined as SettingsIcon, SecurityOutlined as SecurityIcon, NotificationsOutlined as NotificationsIcon, MenuOutlined as MenuIcon } from '@mui/icons-material'; // Import icons
import AppSettingsPage from './App-setting';
import SecuritySettingsPage from './Security-setting';

const HeaderWithMenu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('transactions');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'app-setting':
        return <AppSettingsPage />;
      case 'security-setting':
        return <SecuritySettingsPage />;
      //   case 'track-delivery-status':
      //     return <div>Track Delivery status content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#FFF7F7', // Added background color
            position: 'fixed', // Fixed position
            height: '100vh', // Full height
            top: 0, // Align top
            paddingTop: '64px', // Adjust top padding to fit below header
          },
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Toolbar>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(false)} // Close sidebar on icon click
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div">
            PAYSEQUR
          </Typography>
        </Toolbar>
        <List>
          {/* Use Link component for the Dashboard item */}
          <ListItem button component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handlePageChange('app-setting')}>
            <SettingsIcon />
            <ListItemText primary="App Setting" />
          </ListItem>
          <ListItem button onClick={() => handlePageChange('security-setting')}>
            <SecurityIcon />
            <ListItemText primary="Security Setting" />
          </ListItem>
          <ListItem button onClick={() => handlePageChange('track-delivery-status')}>
            <NotificationsIcon />
            <ListItemText primary="Notification Preferences" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <div style={{ flexGrow: 1, marginLeft: '240px' }}>
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
          <Toolbar>
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setSidebarOpen(true)} // Open sidebar on icon click
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div">
              PAYSEQUR
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '20px' }}>
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default HeaderWithMenu;
