import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#eff1f5' }}>
      <Toolbar>
        <div style={{ position: 'relative', marginRight: '16px', marginLeft: '0', width: 'auto' }}>
          <div style={{ padding: '8px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SearchIcon style={{ color: '#1F2937' }} />
          </div>
          <InputBase
            placeholder="Search…"
            style={{ color: '#1F2937', paddingLeft: '40px', transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', width: '100%', }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Typography variant="h6" style={{ flexGrow: '1', textAlign: 'center', color: '#1F2937' }}>
          Paysequr
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="notifications" style={{ color: '#1F2937' }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="account of current user" style={{ color: '#1F2937' }}>
          <AccountCircleIcon />
        </IconButton>
        <Typography variant="subtitle1" style={{ marginLeft: '5px', color: '#1F2937' }}>
          Username
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
