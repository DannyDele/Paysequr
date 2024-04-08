import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import paysequricon from './images/Paysequricon.png';

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#eff1f5' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="search" style={{ color: '#1F2937' }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search…"
            style={{ color: '#1F2937', paddingLeft: '8px', transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', width: 'auto' }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Paysequr Icon" src={paysequricon} sx={{ width: 30, height: 30, marginRight: '8px' }} />
          <Typography variant="h6" style={{ color: '#1F2937' }}>
            Paysequr
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="end" color="inherit" aria-label="notifications" style={{ color: '#1F2937' }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="account of current user" style={{ color: '#1F2937' }}>
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="subtitle1" style={{ marginLeft: '5px', color: '#1F2937' }}>
            Username
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
